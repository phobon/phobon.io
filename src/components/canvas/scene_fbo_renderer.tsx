import { PerspectiveCamera } from '@/utils/perspective_camera'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { useDebug } from '@/utils/use_debug'

export type SceneFBORendererProps = {
  renderTarget: THREE.WebGLRenderTarget<THREE.Texture>
  children?: React.ReactNode
}

const SceneFBORenderer = ({ renderTarget, children }: SceneFBORendererProps) => {
  const { width, height } = useThree((state) => state.size)
  const cameraRef = useRef<any>(null)

  useFrame(({ gl }) => {
    gl.setRenderTarget(renderTarget)
    gl.clear()
  }, 0)

  useFrame(({ gl, scene }) => {
    gl.setRenderTarget(null)
    gl.setViewport(0, 0, width, height)
    gl.render(scene, cameraRef.current)
  }, 2)

  return (
    <>
      <PerspectiveCamera makeDefault ref={cameraRef} />
      {children}
    </>
  )
}

export default SceneFBORenderer
