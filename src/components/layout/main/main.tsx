'use client'

import { useRef, useEffect } from 'react'
import { css } from '@/design/css'
import { cn } from '@/utils/cn'

import { ReactLenis } from 'lenis/react'
import { gridStyles } from '../common'

export type MainProps = {
  debug?: boolean
} & any

export const Main = ({ className, children }: MainProps) => {
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
      </main>
    </ReactLenis>
  )
}
