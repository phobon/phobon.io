import { useFrame, extend, useThree, ShaderMaterialProps } from '@react-three/fiber'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { v4 as uuid } from 'uuid'

import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import { shaderMaterial } from '@react-three/drei'

const PixelUvMaterial = shaderMaterial(
  {
    u_time: 0,
    u_resolution: [0, 0],
    u_mouse: null,
    u_progress: 0,
    u_diffuse: null,
    u_factor: 0.25,
    u_amplitude: [0, 0],
  },
  vertexShader,
  fragmentShader,
)
PixelUvMaterial.key = uuid()

extend({ PixelUvMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      pixelUvMaterial: ShaderMaterialProps
    }
  }
}

const PixelUv = forwardRef<any, any>(({ texture, factor = 0.5 }, ref) => {
  const meshRef = useRef<any>()
  useImperativeHandle(ref, () => meshRef.current)
  const { width, height } = useThree((state) => state.viewport)

  useFrame(({ clock, pointer, camera }) => {
    const mesh = meshRef.current
    if (!mesh) {
      return
    }

    mesh.material.uniforms.u_resolution.value.x = window.innerWidth
    mesh.material.uniforms.u_resolution.value.y = window.innerWidth
  })

  return (
    <mesh ref={meshRef} scale={[width, height, 1]}>
      <planeGeometry args={[1, 1]} />
      <pixelUvMaterial uniforms-u_diffuse-value={texture} uniforms-u_factor-value={factor} transparent />
    </mesh>
  )
})

const PixelUvMaterialImpl = forwardRef<any, any>(({ texture, factor = 0.5 }, ref) => {
  const materialRef = useRef<any>()
  useImperativeHandle(ref, () => materialRef.current)

  useFrame(({ clock, pointer, camera }) => {
    const material = materialRef.current
    if (!material) {
      return
    }

    material.uniforms.u_resolution.value.x = window.innerWidth
    material.uniforms.u_resolution.value.y = window.innerWidth

    material.uniforms.u_time.value = clock.getElapsedTime()

    material.uniforms.u_factor.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5
  })

  return (
    <pixelUvMaterial
      ref={materialRef}
      uniforms-u_diffuse-value={texture}
      uniforms-u_factor-value={factor}
      transparent
      attach='material'
    />
  )
})

export default PixelUvMaterialImpl