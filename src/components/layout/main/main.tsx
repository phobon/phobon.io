'use client'

import { Suspense, useRef } from 'react'
import { css } from '@/design/css'
import { useGridConfigurationStyles } from '@/helpers/grid_helpers'
import { cn } from '@/helpers/cn'
import Scene, { SceneProps } from '@/components/canvas/scene'
import { ReactLenis } from '@studio-freight/react-lenis'
import { useSearchParams } from 'next/navigation'
import DebugGrid from '../debug_grid'

export type MainProps = {
  debug?: boolean
  showLoader?: boolean
} & Partial<SceneProps>

export const Main = ({ showLoader = false, children }: MainProps) => {
  const gridStyles = useGridConfigurationStyles()
  const ref = useRef()

  const searchParams = useSearchParams()
  const debug = searchParams.get('debug')

  return (
    <>
      <ReactLenis root>
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
            'phbn__main',
          )}
          style={gridStyles}
        >
          <Suspense fallback={null}>{children}</Suspense>
          <Scene
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              pointerEvents: 'none',
            }}
            eventSource={ref}
            eventPrefix='client'
            debug={debug}
            showLoader={showLoader}
          />
        </main>
      </ReactLenis>

      {debug ? <DebugGrid /> : null}
    </>
  )
}
