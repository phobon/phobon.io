'use client'

import { useRef, useEffect } from 'react'
import { css } from '@/design/css'
import { cn } from '@/utils/cn'

import { ReactLenis } from 'lenis/react'
import Scene from '@/components/canvas/scene'
import { gridStyles } from '../common'

export type MainProps = {
  debug?: boolean
} & any

export const Main = ({ className, screenSizeCamera = false, children }: MainProps) => {
  const ref = useRef(null)
  const lenisRef = useRef<any>(null)

  return (
    <ReactLenis
      root
      options={{
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
        {children}
        {/* <Scene
          style={{
            position: 'fixed',
            inset: 0,
            width: '100dvw',
            height: '100dvh',
            pointerEvents: 'none',
          }}
          eventSource={ref}
          eventPrefix='client'
          debug={false}
          screenSizeCamera={screenSizeCamera}
        /> */}
      </main>
    </ReactLenis>
  )
}
