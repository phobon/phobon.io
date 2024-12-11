import { css } from '@/design/css'
import { PerspectiveCamera, View, shaderMaterial, useTexture } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { useMotionValueEvent, useTransform } from 'framer-motion'
import { Suspense, forwardRef, useImperativeHandle, useRef } from 'react'
import * as THREE from 'three'

import * as geometry from 'maath/geometry'

extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry })

export const Stinger = forwardRef<any, any>(({ progress, progress2, ...props }, ref) => {
  const meshRef = useRef<any>(null)
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
    // <View
    //   track={undefined}
    //   className={css({
    //     position: 'absolute',
    //     inset: 0,
    //     pointerEvents: 'none',
    //   })}
    // >
    <StingerImpl ref={meshRef} />
    // </View>
  )
})

const StingerImpl = forwardRef<any, any>(({ dataTexture, ...props }, ref) => {
  const meshRef = useRef<any>(null)
  useImperativeHandle(ref, () => meshRef.current)
  const { width, height } = useThree((state) => state.size)

  const texture = useTexture('/images/dots.png', (t) => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping
  })
  const perlin = useTexture('/images/perlin.png', (t) => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping
  })

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.u_time.value += 0.01
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 1]}>
      {/* @ts-ignore */}
      <roundedPlaneGeometry args={[width, height, 0.08]} />
      {/* @ts-ignore */}
      <stingerMaterial transparent uniforms-u_diffuse-value={texture} uniforms-u_noise-value={perlin} />
    </mesh>
  )
})

const StingerMaterial = shaderMaterial(
  {
    u_progress: 0,
    u_progress2: 0,
    u_time: 0,
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
    v_progress = u_progress * 0.8;
    // float progress = min(u_progress, 0.95);
    // float progress2 = min(u_progress2, 0.95);
    // v_progress = floor(progress * u_factor) / u_factor;
    // v_progress2 = floor(progress2 * u_factor) / u_factor;
  }
`,
  `
  uniform sampler2D u_diffuse;
  uniform sampler2D u_noise;
  uniform float u_progress;
  uniform float u_time;

  varying vec2 v_uv;
  varying float v_progress;
  // varying float v_progress2;

  vec3 correctGamma(vec3 color) {
    return pow(color, vec3(1.0 / 2.2));
  }
  
  void main() {
    vec2 resolution = vec2(48.0, 18.0);
    vec2 uv = v_uv;
    vec2 pixelUv = floor(uv * resolution) / resolution;
    float n = texture(u_noise, pixelUv).r;
    n = pow(n, 0.75);

    float alpha = step(n, u_progress * 1.5);
    float caProgress = smoothstep(0.0, n, u_progress);
    if (alpha == 0.0) discard;

    // vec2 uv = v_uv * 32.0;
    // float t = texture(u_diffuse, uv).r;

    float p  = pow(caProgress, 0.5);


    // Do some chromatic aberration here with caProgress as the progress
    float r = texture(u_noise, pixelUv - vec2(0.3, 0.1) * p).r;
    float g = texture(u_noise, pixelUv - vec2(0.1, 0.1) * p).g;
    float b = texture(u_noise, pixelUv + vec2(0.1, 0.3) * p).b;
    vec3 finalColor = vec3(r, g, b);

    vec3 texel = mix(finalColor, vec3(0.0), caProgress);
    // texel = finalColor;
    texel = correctGamma(texel);

    gl_FragColor = vec4(texel, alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,
)

extend({ StingerMaterial })
