import { useFrame, extend, useThree, ShaderMaterialProps } from '@react-three/fiber'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { v4 as uuid } from 'uuid'

import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import { shaderMaterial } from '@react-three/drei'

const RepeaterMaterial = shaderMaterial(
  {
    u_time: 0,
    u_resolution: [0, 0],
    u_mouse: [0, 0],
    u_camera: [0, 0, 0],
    u_progress: 0,
    u_diffuse: null,
    u_factor: 0.25,
  },
  vertexShader,
  fragmentShader,
)
RepeaterMaterial.key = uuid()

extend({ RepeaterMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      repeaterMaterial: ShaderMaterialProps
    }
  }
}

const Repeater = forwardRef<any, any>(({ texture, factor = 0.5 }, ref) => {
  const meshRef = useRef<any>()
  useImperativeHandle(ref, () => meshRef.current)
  const { width, height } = useThree((state) => state.viewport)

  useFrame(({ clock, pointer, camera }) => {
    const mesh = meshRef.current
    if (!mesh) {
      return
    }

    mesh.material.uniforms.u_time.value = clock.elapsedTime
    mesh.material.uniforms.u_mouse.value.x = pointer.x
    mesh.material.uniforms.u_mouse.value.y = pointer.y

    mesh.material.uniforms.u_camera.value.x = camera.position.x
    mesh.material.uniforms.u_camera.value.y = camera.position.y
    mesh.material.uniforms.u_camera.value.z = camera.position.z

    mesh.material.uniforms.u_resolution.value.x = window.innerWidth
    mesh.material.uniforms.u_resolution.value.y = window.innerWidth
  })

  return (
    <mesh ref={meshRef} scale={[width, height, 1]}>
      <planeGeometry args={[1, 1]} />
      {/* @ts-ignore */}
      <repeaterMaterial uniforms-u_diffuse-value={texture} uniforms-u_factor-value={factor} transparent />
    </mesh>
  )
})

const RepeaterMaterialImpl = forwardRef<any, any>(({ texture, factor = 0.5 }, ref) => {
  const materialRef = useRef<any>()
  useImperativeHandle(ref, () => materialRef.current)

  useFrame(({ clock, pointer, camera }) => {
    const material = materialRef.current
    if (!material) {
      return
    }

    material.uniforms.u_time.value = clock.elapsedTime
    material.uniforms.u_mouse.value.x = pointer.x
    material.uniforms.u_mouse.value.y = pointer.y

    material.uniforms.u_camera.value.x = camera.position.x
    material.uniforms.u_camera.value.y = camera.position.y
    material.uniforms.u_camera.value.z = camera.position.z

    material.uniforms.u_resolution.value.x = window.innerWidth
    material.uniforms.u_resolution.value.y = window.innerWidth
  })

  return (
    <repeaterMaterial
      ref={materialRef}
      uniforms-u_diffuse-value={texture}
      uniforms-u_factor-value={factor}
      transparent
      attach='material'
    />
  )
})

export default RepeaterMaterialImpl
