'use client'

import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import { OrbitControls, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/three'
import { motion } from 'framer-motion'
import { ScreenSizeCamera } from '@/helpers/screen_size_camera'

export type CommonProps = {
  screenSizeCamera?: boolean
  color?: string
  basicLighting?: boolean
}
export const Common = ({ screenSizeCamera = false, color, basicLighting = false }: CommonProps) => (
  <Suspense fallback={null}>
    {/* @ts-ignore */}
    {color && <color attach='background' args={[color]} />}

    {basicLighting ? (
      <>
        {/* @ts-ignore */}
        <ambientLight intensity={0.5} />
        {/* @ts-ignore */}
        <pointLight position={[20, 30, 10]} intensity={1} />
      </>
    ) : null}

    {screenSizeCamera ? <ScreenSizeCamera makeDefault /> : null}
  </Suspense>
)

export const View = forwardRef<any, any>(({ children, orbit, ...props }, ref) => {
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)

  return (
    <>
      <motion.div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>
          {children}
          {orbit && <OrbitControls />}
        </ViewImpl>
      </Three>
    </>
  )
})

View.displayName = 'View'
