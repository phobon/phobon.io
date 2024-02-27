import { View } from '@react-three/drei'
import React, { RefObject, Suspense, useRef } from 'react'
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

const Image = ({ className, src, alt, ...props }) => {
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
        src={src}
        className={cn(
          css({
            // opacity: 0,
            // visibility: 'hidden',
          }),
          className,
        )}
        alt={alt}
        crossOrigin='anonymous'
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
        <Suspense fallback={null}>
          <WebGLImage imgRef={trackRef} scrollYProgress={scrollYProgress} {...props} />
        </Suspense>
      </View>
    </span>
  )
}

type WebGLImageProps = {
  imgRef: RefObject<HTMLImageElement>
  scrollYProgress: MotionValue<number>
}

const WebGLImage = ({ imgRef, scrollYProgress, ...props }: WebGLImageProps) => {
  const ref = useRef<any>()

  // useMotionValueEvent(scrollYProgress, 'change', (latest) => {
  // ref.current.material.grayscale = 1 - latest
  // ref.current.material.zoom = 1 + latest * 0.1
  // ref.current.material.opacity = clamp(latest * 3, 0, 1)
  // })

  // Load texture from the <img/> and suspend until it's ready
  const texture = useImageAsTexture(imgRef)
  const width = imgRef?.current?.width || 0
  const height = imgRef?.current?.height || 0

  return (
    <DreiImage ref={ref} texture={texture} transparent {...props}>
      {/* @ts-ignore */}
      <roundedPlaneGeometry args={[width, height, 4]} />
    </DreiImage>
  )
}

export default Image
