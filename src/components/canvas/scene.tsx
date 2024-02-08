'use client'

import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber'

import { AdaptiveDpr, Preload, StatsGl, View, useFBO, useGLTF } from '@react-three/drei'
import { Loader } from './loader'
import { PerspectiveCamera } from '@/helpers/perspective_camera'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import Pixellation from '../effects/pixellation/pixellation'
import SceneFBORenderer from './scene_fbo_renderer'
// import ChromaticAbberationMaterial from '../effects/chromatic_abberation'

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

        <PixellationScene />

        {debug ? <StatsGl className='phbn__statsgl' /> : null}

        <PerspectiveCamera makeDefault />
      </Canvas>

      {showLoader && <Loader className='phbn__loader' />}
    </>
  )
}

const PixellationScene = ({ ...props }) => {
  const renderTarget = useFBO()
  return (
    <SceneFBORenderer renderTarget={renderTarget} {...props}>
      <Pixellation texture={renderTarget.texture} />
    </SceneFBORenderer>
  )
}

export default Scene
