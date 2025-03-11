import { PerspectiveCamera } from '@/utils/perspective_camera'
import { shaderMaterial } from '@react-three/drei'
import { createPortal, extend, useFrame, useThree } from '@react-three/fiber'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import * as THREE from 'three'
import { v4 as uuid } from 'uuid'
import { damp } from 'maath/easing'

import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import { useMotionValue, useMotionValueEvent, useSpring } from 'framer-motion'

const virtualScene = new THREE.Scene()

export type MouseMaskProps = {
  renderTarget: THREE.WebGLRenderTarget
  index?: number
  radius?: number
}

export const MouseMask = ({ renderTarget, index = 0, radius = 0.1 }: MouseMaskProps) => {
  const cameraRef = useRef<any>(null)
  const mouseMaskRef = useRef<any>(null)
  const prevPointerRef = useRef<any>({ x: 0, y: 0 })
  const factorRef = useRef<any>({ d: 0, target: 0 })

  useFrame(({ clock, gl, pointer }) => {
    if (!renderTarget) {
      return
    }
    const mouseMask = mouseMaskRef.current
    if (!mouseMask) {
      return
    }

    gl.setRenderTarget(renderTarget)
    gl.render(virtualScene, cameraRef.current)
    gl.setRenderTarget(null)

    const dx = pointer.x - prevPointerRef.current.x
    const dy = pointer.y - prevPointerRef.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    factorRef.current.d += distance * 0.075
    factorRef.current.d = Math.min(factorRef.current.d, radius)
    mouseMaskRef.current.material.uniforms.u_radius.value = factorRef.current.d

    // Decay back to 0 over time
    damp(factorRef.current, 'd', 0, 0.005, clock.getDelta())

    mouseMask.material.uniforms.u_time.value = clock.elapsedTime
    mouseMask.material.uniforms.u_mouse.value.x = pointer.x
    mouseMask.material.uniforms.u_mouse.value.y = pointer.y

    prevPointerRef.current.x = pointer.x
    prevPointerRef.current.y = pointer.y
  }, index)

  return (
    <>
      {createPortal(
        <>
          <PerspectiveCamera ref={cameraRef} makeDefault />
          <MouseMaskImpl index={index} ref={mouseMaskRef} />
        </>,
        virtualScene,
      )}
    </>
  )
}

const MouseMaskImpl = forwardRef<any, any>(({ index }, ref) => {
  const { width, height } = useThree((state) => state.size)
  const meshRef = useRef<any>(null)
  useImperativeHandle(ref, () => meshRef.current)

  useEffect(() => {
    // Event when window size changes
    const onResize = () => {
      meshRef.current.material.uniforms.u_resolution.value.x = window.innerWidth
      meshRef.current.material.uniforms.u_resolution.value.y = window.innerHeight
    }

    onResize()

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <mesh scale={[width, height, 1]} ref={meshRef}>
      <planeGeometry args={[1, 1]} />
      {/* @ts-ignore */}
      <mouseMaskMaterial />
    </mesh>
  )
})

const MouseMaskMaterial = shaderMaterial(
  {
    u_time: 0,
    u_resolution: [0, 0],
    u_mouse: [0, 0],
    u_radius: 0,
  },
  vertexShader,
  fragmentShader,
)
MouseMaskMaterial.key = uuid()

extend({ MouseMaskMaterial })
