'use client'

import { View } from '@react-three/drei'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { css } from '@/design/css'
import { PerspectiveCamera } from '@/helpers/perspective_camera'
import { cn } from '@/helpers/cn'
import { MotionValue } from 'framer-motion'
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

export const ImageBase = forwardRef<HTMLImageElement, ImageProps>(
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
