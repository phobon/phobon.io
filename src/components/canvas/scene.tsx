'use client'

import { Canvas } from '@react-three/fiber'

import { AdaptiveDpr, Preload, RenderTexture, StatsGl, View } from '@react-three/drei'
import { Loader } from './loader'
import { PerspectiveCamera } from '@/helpers/perspective_camera'
import { Common } from './common'

export type SceneProps = {
  debug?: boolean
  frameloop?: 'always' | 'demand' | 'never'
  showLoader?: boolean
} & any

const Scene = ({
  debug = false,
  frameloop = 'always',
  showLoader = false,
  screenSizeCamera = false,
  ...props
}: SceneProps) => {
  return (
    <>
      {/* @ts-ignore */}
      <Canvas id='__canvas' {...props}>
        <Preload all />

        <AdaptiveDpr />

        <View.Port />

        {debug ? <StatsGl className='phbn__statsgl' /> : null}

        <PerspectiveCamera makeDefault />
      </Canvas>

      {showLoader && <Loader className='phbn__loader' />}
    </>
  )
}

export default Scene
