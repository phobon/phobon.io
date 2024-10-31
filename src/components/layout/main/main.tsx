'use client'

import { useRef, useEffect } from 'react'
import { css } from '@/design/css'
import { cn } from '@/helpers/cn'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'

import { ReactLenis } from 'lenis/react'
import Scene from '@/components/canvas/scene'
import { gridStyles } from '../common'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

export type MainProps = {
  debug?: boolean
} & any

export const Main = ({ className, screenSizeCamera = false, children }: MainProps) => {
  const ref = useRef()
  const lenisRef = useRef<any>()

  // Minimum required to integrate with GSAP ScrollTrigger
  useEffect(() => {
    const _lenis = lenisRef.current
    if (!_lenis || !_lenis.lenis) {
      return
    }

    const update = (time) => {
      _lenis.lenis.raf(time * 1000)
    }

    _lenis.lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
    }
  }, [])

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
          debug={false}
          screenSizeCamera={screenSizeCamera}
        />
      </main>
    </ReactLenis>
  )
}
