'use client'

import { Suspense, useRef } from 'react'
import { css } from '@/design/css'
import { useGridConfigurationStyles } from '@/helpers/grid_helpers'
import { cn } from '@/helpers/cn'
import Scene, { SceneProps } from '@/components/canvas/scene'
import { ReactLenis } from '@studio-freight/react-lenis'
import { useSearchParams } from 'next/navigation'
import DebugGrid from '../debug_grid'
import { gridStyles } from '../common'

export type MainProps = {
  debug?: boolean
  showLoader?: boolean
} & Partial<SceneProps>

export const Main = ({ className, screenSizeCamera = false, showLoader = false, children }: MainProps) => {
  const ref = useRef()

  const searchParams = useSearchParams()
  const debug = searchParams.get('debug')

  return (
    <>
      <main
        ref={ref}
        className={cn(
          css({
            height: '100%',
            width: '100%',
            position: 'relative',
            overflow: 'auto',
            touchAction: 'auto',
          }),
          gridStyles,
          className,
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
