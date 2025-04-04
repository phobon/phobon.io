'use client'

import { Canvas } from '@react-three/fiber'

import { AdaptiveDpr, Preload, StatsGl, View, useFBO } from '@react-three/drei'
import { PerspectiveCamera } from '@/utils/perspective_camera'
import Pixellation from '../effects/pixellation/pixellation'
import SceneFBORenderer from './scene_fbo_renderer'
// import DotMatrix from '../effects/dot_matrix'
import Overlay from './overlay'

export type SceneProps = {
  debug?: boolean
  frameloop?: 'always' | 'demand' | 'never'
} & any

const Scene = ({ debug = false, frameloop = 'always', screenSizeCamera = false, ...props }: SceneProps) => {
  return (
    <>
      {/* @ts-ignore */}
      <Canvas id='__canvas' frameloop={frameloop} {...props}>
        <Preload all />

        <AdaptiveDpr />

        <View.Port />

        <FBOScene />

        {debug ? <StatsGl className='phbn__statsgl' /> : null}

        <Overlay />

        <PerspectiveCamera makeDefault />
      </Canvas>
    </>
  )
}

const FBOScene = ({ ...props }) => {
  const renderTarget = useFBO()
  return (
    <SceneFBORenderer renderTarget={renderTarget} {...props}>
      <Pixellation texture={renderTarget.texture} />
    </SceneFBORenderer>
  )
}

export default Scene
