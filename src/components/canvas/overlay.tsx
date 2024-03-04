import { shaderMaterial, useProgress } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { animate, progress, useMotionValueEvent, useSpring } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'
import { DefaultLoadingManager } from 'three'
import { useControls } from 'leva'
import { useLoader } from '@/helpers/use_loader'
import { useLayoutStore } from '@/stores/use_layout_store'

const OverlayMaterial = shaderMaterial(
  {
    u_progress: 1,
  },
  `
  void main()
  {
    gl_Position = vec4(position, 1.0);
  }
  `,
  `
  uniform float u_progress;

  void main()
  {
    gl_FragColor = vec4(0.0, 0.0, 0.0, u_progress);
  }
  `,
)

extend({ OverlayMaterial })

const Overlay = () => {
  const overlayRef = useRef<any>()

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) {
      return
    }

    const unsubscribe = useLayoutStore.subscribe(({ loaded }) => {
      animate(overlay.material.uniforms.u_progress.value, loaded ? 0 : 1, {
        duration: 3,
        onUpdate: (latest) => {
          overlay.material.uniforms.u_progress.value = latest
        },
      })
    })

    return () => {
      unsubscribe()
    }
  }, [])

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
      <overlayMaterial transparent />
    </mesh>
  )
}

export default Overlay
