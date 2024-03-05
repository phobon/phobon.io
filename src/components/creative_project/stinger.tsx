import { css } from '@/design/css'
import { PerspectiveCamera, View, shaderMaterial, useTexture } from '@react-three/drei'
import { extend, useThree } from '@react-three/fiber'
import { useMotionValueEvent, useTransform } from 'framer-motion'
import { Suspense, forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import * as THREE from 'three'

import * as geometry from 'maath/geometry'

extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry })

export const Stinger = forwardRef<any, any>(({ progress, progress2, ...props }, ref) => {
  const meshRef = useRef<any>()
  useImperativeHandle(ref, () => meshRef.current)
  // const progress2 = useTransform(progress, [0.5, 1], [0, 1])

  // const dataTexture = useMemo(() => {
  //   const ROWS = 16
  //   const COLUMNS = 16
  //   const array = new Float32Array(ROWS * COLUMNS)

  //   for (let y = 0; y < ROWS;y++) {
  //     for (let x = 0; x < COLUMNS; x++) {
  //       const index = y * COLUMNS + x
  //       array[index] = Math.random()
  //     }
  //   }

  //   return new THREE.DataTexture(array, ROWS, COLUMNS, THREE.RGBAFormat)
  // }, [])

  useMotionValueEvent(progress, 'change', (latest) => {
    const mesh = meshRef.current
    if (!mesh) {
      return
    }

    mesh.material.uniforms.u_progress.value = latest
  })
  useMotionValueEvent(progress2, 'change', (latest) => {
    const mesh = meshRef.current
    if (!mesh) {
      return
    }

    mesh.material.uniforms.u_progress2.value = latest
  })

  return (
    <View
      track={undefined}
      className={css({
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      })}
    >
      <Suspense fallback={null}>
        <StringerImpl ref={meshRef} />
      </Suspense>
    </View>
  )
})

const StringerImpl = forwardRef<any, any>(({ dataTexture, ...props }, ref) => {
  const meshRef = useRef<any>()
  useImperativeHandle(ref, () => meshRef.current)
  const { width, height } = useThree((state) => state.viewport)

  const texture = useTexture('/images/dots.png', (t) => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping
  })
  const perlin = useTexture('/images/perlin.png', (t) => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping
  })

  return (
    <mesh ref={meshRef} position={[-width / 4, 0, 0]}>
      {/* @ts-ignore */}
      <roundedPlaneGeometry args={[width / 2, height, 0.08]} />
      {/* @ts-ignore */}
      <stingerMaterial transparent uniforms-u_diffuse-value={texture} uniforms-u_noise-value={perlin} />
    </mesh>
  )
})

const StingerMaterial = shaderMaterial(
  {
    u_progress: 0,
    u_progress2: 0,
    u_factor: 10,
    u_diffuse: null,
    u_noise: null,
  },
  `
  uniform float u_factor;
  uniform float u_progress;
  uniform float u_progress2;

  varying vec2 v_uv;
  varying float v_progress;
  varying float v_progress2;
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    
    v_uv = uv;
    float progress = min(u_progress, 0.95);
    float progress2 = min(u_progress2, 0.95);
    v_progress = floor(progress * u_factor) / u_factor;
    v_progress2 = floor(progress2 * u_factor) / u_factor;
  }
`,
  `
  uniform sampler2D u_diffuse;
  uniform sampler2D u_noise;
  uniform float u_progress;

  varying vec2 v_uv;
  varying float v_progress;
  varying float v_progress2;
  
  void main() {
    vec2 uv = v_uv * 16.0;

    float t = texture(u_diffuse, uv).r;
    vec3 texel = vec3(t) * vec3(1.0, 0.0, 1.0);

    vec2 pixelUv = floor(v_uv * 16.0) / 16.0;
    float n = texture(u_noise, pixelUv).r;
    n = pow(n, 2.0);

    float alpha = step(n, u_progress);

    // float p = step(v_uv.x, v_progress2);
    // vec3 finalColor = mix(texel, vec3(0.0), p);

    gl_FragColor = vec4(texel, alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,
)

extend({ StingerMaterial })
