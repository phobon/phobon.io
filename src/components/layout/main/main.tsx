'use client'

import { Suspense, useRef } from 'react'
import { css } from '@/design/css'
import { cn } from '@/helpers/cn'
import Scene, { SceneProps } from '@/components/canvas/scene'
import { useSearchParams } from 'next/navigation'
import DebugGrid from '../debug_grid'

import { gridStyles } from '../common'
import ReactLenis from '@studio-freight/react-lenis'

export type MainProps = {
  debug?: boolean
} & Partial<SceneProps>

export const Main = ({ className, screenSizeCamera = false, children }: MainProps) => {
  const ref = useRef()

  const searchParams = useSearchParams()
  const debug = searchParams.get('debug')

  return (
    <ReactLenis
      root
      options={{
        // infinite: true,
        syncTouch: true,
      }}
    >
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
          screenSizeCamera={screenSizeCamera}
        />
      </main>

      {debug ? <DebugGrid /> : null}
    </ReactLenis>
  )
}
