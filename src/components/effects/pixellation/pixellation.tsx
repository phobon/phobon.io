import { useFrame, extend, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { shaderMaterial } from '@react-three/drei'
import { v4 as uuid } from 'uuid'

import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import { useGridTrailTexture } from '@/helpers/use_grid_trail_texture'

const PixellationMaterial = shaderMaterial(
  {
    u_time: 0,
    u_resolution: [0, 0],
    u_diffuse: null,
    u_dataTexture: null,
    u_pageRatio: 0,
    u_amplitude: 0.00001,
  },
  vertexShader,
  fragmentShader,
)
PixellationMaterial.key = uuid()

extend({ PixellationMaterial })

const Pixellation = ({ texture }) => {
  const meshRef = useRef<any>()
  const { width, height } = useThree((state) => state.viewport)

  useFrame(({ clock }) => {
    const mesh = meshRef.current
    if (!mesh) {
      return
    }

    mesh.material.uniforms.u_time.value = clock.elapsedTime

    mesh.material.uniforms.u_resolution.value.x = window.innerWidth
    mesh.material.uniforms.u_resolution.value.y = window.innerWidth
  })

  const [dataTexture, onMove] = useGridTrailTexture({ grid: 32, radius: 0.05, strength: 0.02, decay: 0.9 })

  return (
    <mesh ref={meshRef} scale={[width, height, 1]} onPointerMove={onMove}>
      <planeGeometry args={[1, 1]} />
      {/* @ts-ignore */}
      <pixellationMaterial uniforms-u_diffuse-value={texture} uniforms-u_dataTexture-value={dataTexture} />
    </mesh>
  )
}

export default Pixellation
