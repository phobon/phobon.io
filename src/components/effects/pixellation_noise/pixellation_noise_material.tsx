import { shaderMaterial, useTexture } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { useMotionValueEvent } from 'framer-motion'
import { useRef } from 'react'
import * as THREE from 'three'

const PixellationNoiseMaterialImpl = shaderMaterial(
  {
    u_noise: null,
    u_resolution: [48, 18],
    u_progress: 0,
    u_color: new THREE.Color('#000'),
  },
  `
  varying vec2 v_uv;

  void main() {
    gl_Position = vec4(position, 1.0);
    v_uv = uv;
  }
`,
  `
  uniform float u_progress;
  uniform vec3 u_color;

  uniform sampler2D u_noise;

  uniform vec2 u_resolution;

  varying vec2 v_uv;
  
  void main() {
    vec2 uv = v_uv;
    float progress = clamp(u_progress, 0.0, 1.0);

    // vec2 resolution = vec2(48.0, 18.0);
    vec2 resolution = u_resolution;
    vec2 pixelUv = floor(uv * resolution) / resolution;
    float n = texture(u_noise, pixelUv).r;
    n = pow(n, 0.5);
    float alpha = step(n, progress * 1.5);

    vec4 finalColor = vec4(u_color, alpha);

    gl_FragColor = finalColor;
    
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,
)

extend({ PixellationNoiseMaterialImpl })

export type PixellationNoiseMaterialProps = {
  initial?: number
  progress?: any
  resolution?: [number, number]
  color?: string
} & JSX.IntrinsicElements['shaderMaterial']

export const PixellationNoiseMaterial = ({
  initial = 0,
  progress,
  resolution,
  color = '#000',
  ...props
}: PixellationNoiseMaterialProps) => {
  const materialRef = useRef<any>(null)

  const perlin = useTexture('/images/perlin.png', (t) => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping
  })

  useMotionValueEvent(progress, 'change', (latest: number) => {
    const material = materialRef.current
    if (!material) {
      return
    }

    material.uniforms.u_progress.value = latest
  })

  return (
    // @ts-ignore
    <pixellationNoiseMaterialImpl
      {...props}
      ref={materialRef}
      transparent
      u_progress={initial}
      u_noise={perlin}
      u_resolution={resolution}
      u_color={color}
    />
  )
}
