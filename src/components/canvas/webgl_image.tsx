'use client'

import { View } from '@react-three/drei'
import React, { RefObject, useRef } from 'react'
import { Image as DreiImage } from './image'
import { css } from '@/design/css'
import { extend, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@/helpers/perspective_camera'
import { cn } from '@/helpers/cn'
import { useImgTracker } from '@/helpers/use_tracker'
import { useImageAsTexture } from '@/helpers/use_image_as_texture'
import { MotionValue, useMotionValueEvent } from 'framer-motion'
import * as THREE from 'three'
import NextImage from 'next/image'

export type ImageProps = any

const Image = ({
  className,
  src,
  alt,
  children,
  progress,
  width,
  height,
  priority,
  loading = 'lazy',
  crossOrigin = 'anonymous',
  ...props
}: any) => {
  const { viewRef, trackRef, scrollYProgress } = useImgTracker()

  return (
    <span
      className={cn(
        css({
          position: 'relative',
          backgroundColor: '#000',
        }),
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <NextImage
        ref={trackRef}
        src={src}
        className={className}
        alt={alt}
        crossOrigin={crossOrigin}
        width={width}
        height={height}
        loading={priority === true ? 'eager' : loading}
        priority={priority}
      />

      <View
        className={css({
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        })}
        ref={viewRef}
      >
        <PerspectiveCamera makeDefault />
        {children}
        <WebGLImage imgRef={trackRef} scrollYProgress={scrollYProgress} progress={progress} {...props} />
      </View>
    </span>
  )
}

type WebGLImageProps = {
  imgRef: RefObject<HTMLImageElement>
  scrollYProgress: MotionValue<number>
  progress: MotionValue<number>
}

const WebGLImage = ({ imgRef, scrollYProgress, progress, ...props }: WebGLImageProps) => {
  const ref = useRef<any>()

  // useMotionValueEvent(scrollYProgress, 'change', (latest) => {
  // ref.current.material.grayscale = 1 - latest
  // ref.current.material.zoom = 1 + latest * 0.1
  // ref.current.material.opacity = clamp(latest * 3, 0, 1)
  // })

  useMotionValueEvent(progress, 'change', (latest) => {
    if (!ref.current) {
      return
    }
    ref.current.material.uniforms.u_progress.value = latest
  })

  // Load texture from the <img/> and suspend until it's ready
  const texture = useImageAsTexture(imgRef)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  const width = imgRef?.current?.width || 0
  const height = imgRef?.current?.height || 0
  const imageBounds: [number, number] = [texture!.image.width, texture!.image.height]

  return (
    <DreiImage ref={ref} texture={texture} transparent {...props} scale={[width, height]} imageBounds={imageBounds} />
  )
}

export default Image
