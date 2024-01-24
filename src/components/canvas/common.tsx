'use client'

import { Suspense } from 'react'
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