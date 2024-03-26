'use client'

import { useMediaQuery } from '@uidotdev/usehooks'
import { ImageBase, ImageProps } from './image_base'
import { useImgTracker } from '@/helpers/use_tracker'
import { useRef } from 'react'
import { useMotionValueEvent } from 'framer-motion'
import { useImageAsTexture } from '@/helpers/use_image_as_texture'
import * as THREE from 'three'
import { CellularImage } from './cellular_image'

const Image = ({ progress, ...props }: ImageProps) => {
  const desktop = useMediaQuery('only screen and (min-width: 768px)')
  const { viewRef, trackRef, scrollYProgress, hidden } = useImgTracker({
    hide: desktop,
  })

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

export default Image
