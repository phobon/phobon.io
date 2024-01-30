/* eslint-disable react/display-name */
import { PerspectiveCamera } from '@/helpers/perspective_camera'
import { useFBO } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'

export type SceneFBORendererProps = {
  children?: React.ReactNode
}

const SceneFBORenderer = ({ children }: SceneFBORendererProps) => {
  const { width, height } = useThree((state) => state.size)
  const cameraRef = useRef<any>()
  const meshRef = useRef<any>()

  const renderTarget = useFBO()

  useFrame(({ gl }) => {
    gl.setRenderTarget(renderTarget)
    gl.clear()
  }, 0)

  useFrame(({ gl, scene }) => {
    gl.setRenderTarget(null)
    gl.setViewport(0, 0, width, height)
    gl.render(scene, cameraRef.current)

    meshRef.current.material.uniforms.u_diffuse.value = renderTarget.texture
  }, 2)

  return (
    <>
      <PerspectiveCamera makeDefault ref={cameraRef} />
      <mesh ref={meshRef} scale={[width, height, 1]}>
        <planeGeometry args={[1, 1]} />
        {children ? children : <meshBasicMaterial transparent />}
      </mesh>
    </>
  )
}

export default SceneFBORenderer
