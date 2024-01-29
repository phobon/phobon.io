'use client'

import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber'

import {
  AdaptiveDpr,
  MeshTransmissionMaterial,
  Preload,
  RenderTexture,
  StatsGl,
  View,
  useFBO,
  useGLTF,
} from '@react-three/drei'
import { Loader } from './loader'
import { PerspectiveCamera } from '@/helpers/perspective_camera'
import { Common } from './common'
import { useRef, useState } from 'react'
import { easing } from 'maath'
import * as THREE from 'three'

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

        {/* <Lens> */}
        <View.Port />
        {/* </Lens> */}

        {debug ? <StatsGl className='phbn__statsgl' /> : null}

        <PerspectiveCamera makeDefault />
      </Canvas>

      {showLoader && <Loader className='phbn__loader' />}
    </>
  )
}

function Lens({ children, damping = 0.15, ...props }) {
  const ref = useRef<any>()
  const { nodes } = useGLTF('/lens-transformed.glb')
  const buffer = useFBO()
  const viewport = useThree((state) => state.viewport)
  const [scene] = useState(() => new THREE.Scene())
  useFrame((state, delta) => {
    // Tie lens to the pointer
    // getCurrentViewport gives us the width & height that would fill the screen in threejs units
    // By giving it a target coordinate we can offset these bounds, for instance width/height for a plane that
    // sits 15 units from 0/0/0 towards the camera (which is where the lens is)
    const viewport = state.viewport.getCurrentViewport(state.camera, [0, 0, 15])
    // easing.damp3(
    //   ref.current.position,
    //   [(state.pointer.x * viewport.width) / 2, (state.pointer.y * viewport.height) / 2, 15],
    //   damping,
    //   delta,
    // )
    // This is entirely optional but spares us one extra render of the scene
    // The createPortal below will mount the children of <Lens> into the new THREE.Scene above
    // The following code will render that scene into a buffer, whose texture will then be fed into
    // a plane spanning the full screen and the lens transmission material
    state.gl.setRenderTarget(buffer)
    state.gl.setClearColor('#d8d7d7')
    state.gl.render(scene, state.camera)
    state.gl.setRenderTarget(null)
  })
  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        {/* <meshBasicMaterial map={buffer.texture} /> */}
        <meshBasicMaterial color='orange' />
      </mesh>
      {/* <mesh scale={0.25} ref={ref} rotation-x={Math.PI / 2} geometry={nodes.Cylinder.geometry} {...props}>
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={1.2}
          thickness={1.5}
          anisotropy={0.1}
          chromaticAberration={0.04}
        />
      </mesh> */}
    </>
  )
}

export default Scene
