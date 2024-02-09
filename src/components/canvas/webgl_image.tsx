import { View } from '@react-three/drei'
import React, { RefObject, useRef } from 'react'
import { Image as DreiImage } from '@react-three/drei'
import { css } from '@/design/css'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@/helpers/perspective_camera'
import { cn } from '@/helpers/cn'
import { useImgTracker } from '@/helpers/use_tracker'
import { useImageAsTexture } from '@/helpers/use_image_as_texture'
import { MotionValue, useMotionValueEvent } from 'framer-motion'
import { clamp } from '@/helpers/math'

const Image = ({ className, src, alt, ...props }) => {
  const { trackRef, rect, scrollYProgress } = useImgTracker()

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
            opacity: 0,
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
        style={{
          width: rect?.width,
          height: rect?.height,
        }}
      >
        <PerspectiveCamera makeDefault />
        {rect ? <WebGLImage imgRef={trackRef} rect={rect} scrollYProgress={scrollYProgress} {...props} /> : null}
      </View>
    </span>
  )
}

type WebGLImageProps = {
  imgRef: RefObject<HTMLImageElement>
  rect: DOMRect
  scrollYProgress: MotionValue<number>
}

const WebGLImage = ({ imgRef, rect, scrollYProgress, ...props }: WebGLImageProps) => {
  const ref = useRef<any>()

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    ref.current.material.grayscale = 1 - latest
    ref.current.material.zoom = 1 + latest * 0.1
    ref.current.material.opacity = clamp(latest * 3, 0, 1)
  })

  // Load texture from the <img/> and suspend until it's ready
  const texture = useImageAsTexture(imgRef)
  const { width, height } = rect

  return <DreiImage scale={[width, height]} ref={ref} texture={texture} transparent {...props}></DreiImage>
}

export default Image
