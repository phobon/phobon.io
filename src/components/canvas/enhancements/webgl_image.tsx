'use client'

import { useMediaQuery } from '@uidotdev/usehooks'
import { ImageBase, ImageProps } from './image_base'
import { useRef } from 'react'
import { useImageAsTexture } from '@/utils/use_image_as_texture'
import * as THREE from 'three'
import { Image as DreiImage } from '@react-three/drei'

const Image = ({ width, height, ...props }: ImageProps) => {
  const desktop = useMediaQuery('only screen and (min-width: 768px)')
  const viewRef = useRef<any>(null)
  const trackRef = useRef<any>(null)
  const hidden = desktop

  return (
    <ImageBase {...props} width={width} height={height} ref={trackRef} viewRef={viewRef} hidden={hidden}>
      <ImageImpl trackRef={trackRef} />
    </ImageBase>
  )
}

const ImageImpl = ({ trackRef }) => {
  const ref = useRef<any>(null)

  // Load texture from the <img/> and suspend until it's ready
  const texture = useImageAsTexture(trackRef, { wrap: true })
  const width = trackRef?.current?.width || 0
  const height = trackRef?.current?.height || 0
  // const imageBounds: [number, number] = [texture!.image.width, texture!.image.height]

  return <DreiImage ref={ref} texture={texture} transparent scale={[width, height]} />
}

export default Image
