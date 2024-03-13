'use client'

import { View, useVideoTexture } from '@react-three/drei'
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

const Video = ({
  className,
  src,
  fallback,
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
        src={fallback}
        className={className}
        alt={alt}
        crossOrigin={crossOrigin}
        width={width}
        height={height}
        loading={priority === true ? 'eager' : loading}
        priority={priority}
      />

      <View
        track={undefined} // This is deprecated in drei, so setting to undefined here just to satisfy ts
        className={css({
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        })}
        ref={viewRef}
      >
        <PerspectiveCamera makeDefault />
        {children}
        <WebGLVideo imgRef={trackRef} src={src} scrollYProgress={scrollYProgress} progress={progress} {...props} />
      </View>
    </span>
  )
}

type WebGLVideoProps = {
  src: string
  imgRef: RefObject<HTMLImageElement>
  scrollYProgress: MotionValue<number>
  progress: MotionValue<number>
}

const WebGLVideo = ({ src, imgRef, scrollYProgress, progress, ...props }: WebGLVideoProps) => {
  const ref = useRef<any>()

  // useMotionValueEvent(scrollYProgress, 'change', (latest) => {
  // ref.current.material.grayscale = 1 - latest
  // ref.current.material.zoom = 1 + latest * 0.1
  // ref.current.material.opacity = clamp(latest * 3, 0, 1)
  // })

  useMotionValueEvent(progress, 'change', (latest) => {
    ref.current.material.uniforms.u_progress.value = latest
  })

  const texture = useVideoTexture(src)
  const width = imgRef?.current?.width || 0
  const height = imgRef?.current?.height || 0

  return (
    <DreiImage
      ref={ref}
      texture={texture}
      transparent
      {...props}
      scale={[width, height]}
      imageBounds={[width, height]}
    />
  )
}

export default Video
