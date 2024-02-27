import { View, useVideoTexture } from '@react-three/drei'
import React, { RefObject, useRef } from 'react'
import { Image as DreiImage } from '@react-three/drei'
import { css } from '@/design/css'
import { extend, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@/helpers/perspective_camera'
import { cn } from '@/helpers/cn'
import { useImgTracker } from '@/helpers/use_tracker'
import { useImageAsTexture } from '@/helpers/use_image_as_texture'
import { MotionValue, useMotionValueEvent } from 'framer-motion'
import { clamp } from '@/helpers/math'
import * as geometry from 'maath/geometry'

extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry })

const Video = ({ className, fallback, src, alt, ...props }) => {
  const { viewRef, trackRef, scrollYProgress } = useImgTracker()

  return (
    <span
      className={cn(
        css({
          position: 'relative',
        }),
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={trackRef}
        src={fallback}
        className={cn(
          css({
            // opacity: 0,
            // visibility: 'hidden',
          }),
          className,
        )}
        alt={alt}
      />
      <View
        track={undefined} // This is deprecated in drei, so setting to undefined here just to satisfy ts
        className={css({
          position: 'absolute',
          inset: 0,
        })}
        ref={viewRef}
      >
        <PerspectiveCamera makeDefault />
        <WebGLVideo imgRef={trackRef} src={src} scrollYProgress={scrollYProgress} {...props} />
      </View>
    </span>
  )
}

type WebGLVideoProps = {
  src: string
  imgRef: RefObject<HTMLImageElement>
  scrollYProgress: MotionValue<number>
}

const WebGLVideo = ({ imgRef, src, scrollYProgress, ...props }: WebGLVideoProps) => {
  const ref = useRef<any>()

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // ref.current.material.grayscale = 1 - latest
    // ref.current.material.zoom = 1 + latest * 0.1
    // ref.current.material.opacity = clamp(latest * 3, 0, 1)
  })

  // Load texture from the <img/> and suspend until it's ready
  const texture = useVideoTexture(src)
  const width = imgRef?.current?.width || 0
  const height = imgRef?.current?.height || 0

  return (
    <mesh ref={ref} {...props}>
      {/* @ts-ignore */}
      <roundedPlaneGeometry args={[width, height, 8]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  )
}

export default Video
