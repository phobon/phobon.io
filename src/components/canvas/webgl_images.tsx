'use client'

import { View, useVideoTexture } from '@react-three/drei'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { CellularImage } from './cellular_image'
import { css } from '@/design/css'
import { PerspectiveCamera } from '@/helpers/perspective_camera'
import { cn } from '@/helpers/cn'
import { useImgTracker } from '@/helpers/use_tracker'
import { useImageAsTexture } from '@/helpers/use_image_as_texture'
import { MotionValue, useMotionValueEvent } from 'framer-motion'
import * as THREE from 'three'
import NextImage from 'next/image'

export type ImageProps = {
  width: number
  height: number
  priority?: boolean
  progress?: MotionValue<number>
  scrollYProgress?: MotionValue<number>
  viewRef?: React.MutableRefObject<any>
  hidden?: boolean
} & React.ImgHTMLAttributes<HTMLImageElement>

const ImageBase = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      className,
      src,
      alt,
      children,
      width,
      height,
      priority,
      loading = 'lazy',
      crossOrigin = 'anonymous',
      viewRef,
      hidden,
      scrollYProgress,
    },
    ref,
  ) => {
    const imgRef = useRef<HTMLImageElement>()
    useImperativeHandle(ref, () => imgRef.current)
    // useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // })

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
        <NextImage
          ref={imgRef}
          src={src}
          className={className}
          alt={alt}
          crossOrigin={crossOrigin}
          width={width}
          height={height}
          loading={priority === true ? 'eager' : loading}
          priority={priority}
        />

        {hidden ? (
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
          </View>
        ) : null}
      </span>
    )
  },
)

export const Image = ({ progress, ...props }: ImageProps) => {
  const { viewRef, trackRef, scrollYProgress, hidden } = useImgTracker()

  return (
    <ImageBase {...props} ref={trackRef} viewRef={viewRef} hidden={hidden}>
      <ImageImpl trackRef={trackRef} progress={progress} scrollYProgress={scrollYProgress} />
    </ImageBase>
  )
}

const ImageImpl = ({ trackRef, progress, scrollYProgress }) => {
  const ref = useRef<any>()
  useMotionValueEvent(progress, 'change', (latest) => {
    if (!ref.current) {
      return
    }
    ref.current.material.uniforms.u_progress.value = latest
  })

  // useMotionValueEvent(scrollYProgress, 'change', (latest) => {
  // ref.current.material.grayscale = 1 - latest
  // ref.current.material.zoom = 1 + latest * 0.1
  // ref.current.material.opacity = clamp(latest * 3, 0, 1)
  // })

  // Load texture from the <img/> and suspend until it's ready
  const texture = useImageAsTexture(trackRef)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  const width = trackRef?.current?.width || 0
  const height = trackRef?.current?.height || 0
  const imageBounds: [number, number] = [texture!.image.width, texture!.image.height]

  return <CellularImage ref={ref} texture={texture} transparent scale={[width, height]} imageBounds={imageBounds} />
}

export const Video = ({ progress, src, fallback, videoDimensions, ...props }: any) => {
  const { viewRef, trackRef, scrollYProgress, hidden } = useImgTracker()

  return (
    <ImageBase {...props} src={fallback} ref={trackRef} viewRef={viewRef} hidden={hidden}>
      <VideoImpl src={src} trackRef={trackRef} progress={progress} videoDimensions={videoDimensions} />
    </ImageBase>
  )
}

const VideoImpl = ({ src, trackRef, progress, videoDimensions }) => {
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

  const texture = useVideoTexture(src)
  const containerWidth = trackRef?.current?.width || 0
  const containerHeight = trackRef?.current?.height || 0

  return (
    <CellularImage
      ref={ref}
      texture={texture}
      transparent
      scale={[containerWidth, containerHeight]}
      imageBounds={[videoDimensions[0], videoDimensions[1]]}
    />
  )
}
