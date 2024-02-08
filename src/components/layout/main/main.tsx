'use client'

import { Suspense, useEffect, useRef } from 'react'
import { css } from '@/design/css'
import { useGridConfigurationStyles } from '@/helpers/grid_helpers'
import { cn } from '@/helpers/cn'
import Scene, { SceneProps } from '@/components/canvas/scene'
import { useSearchParams } from 'next/navigation'
import DebugGrid from '../debug_grid'

import { addEffect } from '@react-three/fiber'
import Lenis from '@studio-freight/lenis'
import { gridStyles } from '../common'
import { useIsomorphicLayoutEffect } from 'framer-motion'

export type MainProps = {
  debug?: boolean
  showLoader?: boolean
} & Partial<SceneProps>

export const Main = ({ className, screenSizeCamera = false, showLoader = false, children }: MainProps) => {
  const ref = useRef()

  const searchParams = useSearchParams()
  const debug = searchParams.get('debug')

  useIsomorphicLayoutEffect(() => {
    const lenis = new Lenis({
      infinite: true,
      syncTouch: true,
      autoResize: false,
    })
    addEffect((t) => lenis.raf(t))
  }, [])

  return (
    <>
      <main
        ref={ref}
        className={cn(
          css({
            width: '100%',
            position: 'relative',
            overflow: 'auto',
            touchAction: 'auto',
          }),
          className,
          gridStyles,
          'phbn__main',
        )}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <Scene
          style={{
            position: 'fixed',
            inset: 0,
            width: '100dvw',
            height: '100dvh',
            pointerEvents: 'none',
          }}
          eventSource={ref}
          eventPrefix='client'
          debug={debug}
          showLoader={showLoader}
          screenSizeCamera={screenSizeCamera}
        />
      </main>

      {debug ? <DebugGrid /> : null}
    </>
  )
}
