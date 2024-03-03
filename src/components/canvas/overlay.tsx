import { shaderMaterial, useProgress } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { animate, useMotionValueEvent, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { DefaultLoadingManager } from 'three'
import { useControls } from 'leva'

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

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) {
      return
    }

    if (!DefaultLoadingManager) {
      return
    }

    const onLoad = DefaultLoadingManager.onLoad

    DefaultLoadingManager.onLoad = () => {
      onLoad()

      animate(1, 0, {
        duration: 10,
        onUpdate: (latest) => {
          console.log(overlay.material.uniforms.u_progress.value)
          overlay.material.uniforms.u_progress.value = latest
        },
      })
    }
  }, [])

  return (
    <mesh ref={overlayRef}>
      <planeGeometry args={[2, 2]} />
      {/* @ts-ignore */}
      <overlayMaterial transparent />
    </mesh>
  )
}

export default Overlay
