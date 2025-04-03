'use client'

import { useImgTracker } from '@/utils/use_tracker'
import { useMediaQuery } from '@uidotdev/usehooks'
import { ImageBase } from './image_base'
import { useRef } from 'react'
import { useMotionValueEvent } from 'motion/react'
import { useVideoTexture } from '@react-three/drei'
import { CellularImage } from './cellular_image'

const Video = ({ progress, src, fallback, videoDimensions, ...props }: any) => {
  const desktop = useMediaQuery('only screen and (min-width: 768px)')
  const { viewRef, trackRef, scrollYProgress, hidden } = useImgTracker({
    hide: desktop,
  })

  return (
    <ImageBase {...props} src={fallback} ref={trackRef} viewRef={viewRef} hidden={hidden}>
      <VideoImpl src={src} trackRef={trackRef} progress={progress} videoDimensions={videoDimensions} />
    </ImageBase>
  )
}

const VideoImpl = ({ src, trackRef, progress, videoDimensions }) => {
  const ref = useRef<any>(null)
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

export default Video
