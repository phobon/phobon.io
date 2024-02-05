/* eslint-disable react/display-name */
import { PerspectiveCamera } from '@/helpers/perspective_camera'
import { useFBO, useTrailTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import MouseMask from '../mouse_mask'
import { damp2 } from 'maath/easing'
import * as THREE from 'three'
import { useDebug } from '@/helpers/use_debug'

export type SceneFBORendererProps = {
  children?: React.ReactNode
}

const target = new THREE.Vector2(0, 0)

const SceneFBORenderer = ({ children }: SceneFBORendererProps) => {
  const { width, height } = useThree((state) => state.size)
  const cameraRef = useRef<any>()
  const meshRef = useRef<any>()

  const renderTarget = useFBO()
  // const mouseRenderTarget = useFBO()
  const previousPointerRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0))
  const pointerDxRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0))
  const pointerTargetRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0))

  const [mouseTexture, onMove] = useTrailTexture({})

  const debug = useDebug()

  useFrame(({ gl }) => {
    gl.setRenderTarget(renderTarget)
    gl.clear()
  }, 0)

  useFrame(({ gl, scene, pointer, clock }) => {
    gl.setRenderTarget(null)
    gl.setViewport(0, 0, width, height)
    gl.render(scene, cameraRef.current)

    const dx = pointer.x - previousPointerRef.current.x
    const dy = pointer.y - previousPointerRef.current.y
    pointerDxRef.current.x = dx
    pointerDxRef.current.y = dy

    previousPointerRef.current.x = pointer.x
    previousPointerRef.current.y = pointer.y

    damp2(pointerTargetRef.current, pointerDxRef.current, 0.005, clock.getDelta())

    meshRef.current.material.uniforms.u_diffuse.value = renderTarget.texture
    meshRef.current.material.uniforms.u_mouse.value = mouseTexture
    meshRef.current.material.uniforms.u_amplitude.value.x = pointerTargetRef.current.x
    meshRef.current.material.uniforms.u_amplitude.value.y = pointerTargetRef.current.y

    if (debug) {
      console.log('pointerTargetRef.current', pointerTargetRef.current)
    }
  }, 2)

  return (
    <>
      <PerspectiveCamera makeDefault ref={cameraRef} />
      <mesh ref={meshRef} scale={[width, height, 1]} onPointerMove={onMove}>
        <planeGeometry args={[1, 1]} />
        {children ? children : <meshBasicMaterial transparent />}
      </mesh>

      {/* <MouseMask renderTarget={mouseRenderTarget} /> */}
    </>
  )
}

export default SceneFBORenderer
