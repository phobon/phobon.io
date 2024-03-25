'use client'

import { css } from '@/design/css'
import { cn } from '@/helpers/cn'
import { LayoutStore, useLayoutStore } from '@/stores/use_layout_store'
import { useProgress } from '@react-three/drei'
import { useEffect, useRef } from 'react'

type DataInterpolationFunction = (p: number) => [number, string]

const customDataInterpolation: DataInterpolationFunction = (p) => {
  const s = p.toLocaleString('en-US', {
    minimumIntegerDigits: 1,
    maximumFractionDigits: 0,
    useGrouping: false,
  })

  return [Number(s), s]
}

export type LoaderProps = {
  dataInterpolation?: DataInterpolationFunction
  className?: string
  defaultTimeout?: number
}

const setLoadedSelector = ({ setLoaded, loaded }): Pick<LayoutStore, 'setLoaded' | 'loaded'> => ({
  setLoaded,
  loaded,
})

const Loader = ({ dataInterpolation = customDataInterpolation, className, defaultTimeout = 500 }: LoaderProps) => {
  const containerRef = useRef(null)
  const progressSpanRef = useRef(null)
  const { setLoaded, loaded } = useLayoutStore(setLoadedSelector)

  useEffect(() => {
    const progressSpan = progressSpanRef.current
    if (!progressSpan) {
      // console.log('1')
      return
    }
    const container = containerRef.current
    if (!progressSpan) {
      // console.log('2')
      return
    }

    let t

    const updateProgress = (progress: number) => {
      const [p, s] = dataInterpolation(progress)
      progressSpan.innerText = p

      if (p >= 99) {
        progressSpan.style.cssText = '--pretext: ""'
      } else if (p > 9) {
        progressSpan.style.cssText = '--pretext: "0"'
      }

      // Loading is now done
      if (progress === 100) {
        t = setTimeout(() => {
          // console.log('loaded')

          setLoaded(true)
          document.documentElement.style.cssText = '--backgroundColor: hsl(240, 22%, 99%);'
          container.style.opacity = 0

          setTimeout(() => {
            container.style.pointerEvents = 'none'
            container.style.visibility = 'hidden'
          }, 300)
        }, defaultTimeout)
      } else {
        // console.log('not loaded', progress)
      }
    }

    const unsubscribe = useProgress.subscribe(({ active, progress }) => {
      updateProgress(progress)
    })

    updateProgress(0)

    return () => {
      unsubscribe()
      clearTimeout(t)
    }
  }, [dataInterpolation, defaultTimeout, setLoaded])

  return (
    <div className={cn(containerStyles, className)} ref={containerRef}>
      <span ref={progressSpanRef} className={textStyles} />
    </div>
  )
}
const containerStyles = css({
  position: 'fixed',
  inset: 0,
  transition: 'opacity 300ms ease',
  zIndex: 9999,
  overflowX: 'hidden',
  overflowY: 'hidden',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  padding: 48,
  opacity: 1,
})

const textStyles = css({
  fontSize: '$13',
  position: 'relative',
  fontVariantNumeric: 'tabular-nums',

  '--pretext': '"00"',
  '&::before': {
    content: 'var(--pretext)',
    fontVariantNumeric: 'tabular-nums',
    fontSize: 'inherit',
    opacity: 0.1,
    position: 'absolute',
    right: '100%',
    top: 0,
    zIndex: -1,
  },
})

export default Loader
