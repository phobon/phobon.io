'use client'

import { Suspense, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { View, Text as DreiText } from '@react-three/drei'
import { css } from '@/design/css'
import { MeshDistortMaterial } from '@react-three/drei'
import { WebGLText } from './webgl_text'
import { useFrame } from '@react-three/fiber'

export const Text = forwardRef<any, any>(({ className, children, font, as: Tag = 'span' }, ref) => {
  const localRef = useRef<any>()
  useImperativeHandle(ref, () => localRef.current)

  return (
    <span className={className}>
      {/* @ts-ignore */}
      <Tag
        ref={localRef}
        className={css({
          opacity: 0,
        })}
      >
        {children}
      </Tag>

      <View className={css({})} track={localRef}>
        <DreiText>{children}</DreiText>
        {/* <WebGLText
          el={localRef} // getComputedStyle is called on this element
          font={font} // path to the typeface (*.woff)
        >
          {children}
        </WebGLText> */}
      </View>
    </span>
  )
})

const Placeholder = ({ color }) => {
  const meshRef = useRef<any>()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
    }
  })
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}
