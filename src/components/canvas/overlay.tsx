import { shaderMaterial, useTexture } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { animate, useMotionValue, useMotionValueEvent, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useLayoutStore } from '@/stores/use_layout_store'
import * as THREE from 'three'
// import { useControls } from 'leva'

const OverlayMaterial = shaderMaterial(
  {
    u_time: 0,
    u_noise: null,
    u_progress: 1,
  },
  `
  uniform float u_time;
  uniform sampler2D u_noise;
  uniform float u_progress;

  varying vec2 v_uv;

  void main() {
    gl_Position = vec4(position, 1.0);

    v_uv = uv;
  }
`,
  `

  uniform vec3 color;
  uniform float u_progress;

  uniform sampler2D u_noise;

  varying vec2 v_uv;
  
  void main() {
    vec2 uv = v_uv;
    vec2 resolution = vec2(48.0, 18.0);
    vec2 pixelUv = floor(uv * resolution) / resolution;
    float n = texture(u_noise, pixelUv).r;
    n = pow(n, 0.5);
    float alpha = step(n, u_progress * 1.5);

    vec4 finalColor = vec4(color, alpha);

    gl_FragColor = finalColor;
    
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,
)

extend({ OverlayMaterial })

const Overlay = () => {
  const overlayRef = useRef<any>()
  const progressValue = useMotionValue(1)
  const progressSpring = useSpring(progressValue, { damping: 300, stiffness: 800 })

  const perlin = useTexture('/images/perlin.png', (t) => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping
  })

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) {
      return
    }

    const unsubscribe = useLayoutStore.subscribe(({ loaded }) => {
      progressValue.set(loaded ? 0 : 1)
      // animate(overlay.material.uniforms.u_progress.value, loaded ? 0 : 1, {
      //   // duration: 3,
      //   onUpdate: (latest) => {
      //     overlay.material.uniforms.u_progress.value = latest
      //   },
      // })
    })

    return () => {
      unsubscribe()
    }
  }, [progressValue])

  useMotionValueEvent(progressSpring, 'change', (latest) => {
    const overlay = overlayRef.current
    if (!overlay) {
      return
    }

    overlay.material.uniforms.u_progress.value = latest
  })

  // useControls({
  //   progress: {
  //     value: 1,
  //     min: 0,
  //     max: 1,
  //     onChange: (value) => {
  //       if (!overlayRef.current) {
  //         return
  //       }
  //       overlayRef.current.material.uniforms.u_progress.value = value
  //     },
  //   },
  // })

  return (
    <mesh ref={overlayRef}>
      <planeGeometry args={[2, 2]} />
      {/* @ts-ignore */}
      <overlayMaterial transparent u_noise={perlin} />
    </mesh>
  )
}

export default Overlay
