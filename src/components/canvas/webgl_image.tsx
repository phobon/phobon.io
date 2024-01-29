import { View } from '@react-three/drei'
import React, { MutableRefObject, ReactNode, RefObject, useEffect, useMemo, useRef } from 'react'
import { Image as DreiImage } from '@react-three/drei'
import { css } from '@/design/css'
import { Vector3, useFrame, useThree } from '@react-three/fiber'
import { Material } from 'three'
import { PerspectiveCamera } from '@/helpers/perspective_camera'
import { cn } from '@/helpers/cn'
import { useImgTracker, useTracker } from '@/helpers/use_tracker'
import { useImageAsTexture } from '@/helpers/use_image_as_texture'

const Image = ({ className, src, alt, ...props }) => {
  const { trackRef, rect } = useImgTracker()
  return (
    <div
      className={css({
        position: 'relative',
      })}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={trackRef}
        src={src}
        className={cn(
          css({
            opacity: 0,
            // display: 'inline-block',
          }),
          className,
        )}
        alt={alt}
        {...props}
      />
      <View
        track={undefined} // This is deprecated in drei, so setting to undefined here just to satisfy ts
        className={css({
          position: 'absolute',
          inset: 0,
        })}
      >
        <PerspectiveCamera makeDefault />
        {rect ? <WebGLImage imgRef={trackRef} rect={rect} {...props} /> : null}
      </View>
    </div>
  )
}

type WebGLImageProps = {
  imgRef: RefObject<HTMLImageElement>
  rect: DOMRect
}

const WebGLImage = ({ imgRef, rect, ...props }: WebGLImageProps) => {
  const ref = useRef<any>()

  // Load texture from the <img/> and suspend until it's ready
  const texture = useImageAsTexture(imgRef)

  useFrame(({ clock }) => {
    // // visibility is 0 when image enters viewport and 1 when fully visible
    // ref.current.material.grayscale = clamp(1 - scrollState.visibility ** 3, 0, 1)
    // // progress is 0 when image enters viewport and 1 when image has exited
    // ref.current.material.zoom = 1 + scrollState.progress * 0.66
    // // viewport is 0 when image enters and 1 when image reach top of screen
    // ref.current.material.opacity = clamp(scrollState.viewport * 3, 0, 1)
  })

  // return (
  //   <mesh scale={[100, 100, 1]}>
  //     <planeGeometry args={[1, 1, 1]} />
  //     <meshBasicMaterial color='red' />
  //   </mesh>
  // )

  // const width = texture.source.data.width
  // const height = texture.source.data.height
  const { width, height } = rect

  return <DreiImage scale={[width, height]} ref={ref} texture={texture} transparent {...props} />
}

export default Image
