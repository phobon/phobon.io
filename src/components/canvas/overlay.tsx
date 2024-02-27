import { shaderMaterial, useProgress } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { animate, useMotionValueEvent, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { DefaultLoadingManager } from 'three'

const OverlayMaterial = shaderMaterial(
  {
    u_alpha: 1,
  },
  `
  void main()
  {
    gl_Position = vec4(position, 1.0);
  }
  `,
  `
  uniform float u_alpha;

  void main()
  {
    gl_FragColor = vec4(0.0, 0.0, 0.0, u_alpha);
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

    if (!DefaultLoadingManager) {
      return
    }

    const onLoad = DefaultLoadingManager.onLoad

    DefaultLoadingManager.onLoad = () => {
      onLoad()

      animate(1, 0, {
        duration: 10,
        onUpdate: (latest) => {
          console.log(overlay.material.uniforms.u_alpha.value)
          overlay.material.uniforms.u_alpha.value = latest
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
