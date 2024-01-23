'use client'

import { Canvas, addEffect, useThree } from '@react-three/fiber'

import { AdaptiveDpr, Preload, RenderTexture, StatsGl, View } from '@react-three/drei'
// import { r3f } from '@/helpers/r3f'
import { Loader } from './loader'
import { ScreenSizeCamera } from '@/helpers/screen_size_camera'
// import Lenis from '@studio-freight/lenis'

// const lenis = new Lenis()
// addEffect((t) => lenis.raf(t))

export type SceneProps = {
  debug?: boolean
  frameloop?: 'always' | 'demand' | 'never'
  showLoader?: boolean
} & any

const Scene = ({ debug = false, frameloop = 'always', showLoader = false, ...props }: SceneProps) => {
  return (
    <>
      {/* @ts-ignore */}
      <Canvas id='__canvas' {...props}>
        <Preload all />

        <AdaptiveDpr />

        {/* <r3f.Out /> */}
        <View.Port />

        {debug ? <StatsGl className='phbn__statsgl' /> : null}
      </Canvas>

      {showLoader && <Loader className='phbn__loader' />}
    </>
  )
}

export default Scene
