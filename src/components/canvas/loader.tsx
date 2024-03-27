'use client'

import { css } from '@/design/css'
import { cn } from '@/helpers/cn'
import { LayoutStore, useLayoutStore } from '@/stores/use_layout_store'
import { useProgress } from '@react-three/drei'
import { useMotionValue, useMotionValueEvent, useSpring } from 'framer-motion'
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

const Loader = ({ dataInterpolation = customDataInterpolation, className, defaultTimeout = 2000 }: LoaderProps) => {
  const containerRef = useRef(null)
  const progressSpanRef = useRef(null)
  const progressBarRef = useRef(null)
  const { setLoaded, loaded } = useLayoutStore(setLoadedSelector)
  const progressValue = useMotionValue(0)
  const progressSpring = useSpring(progressValue, { stiffness: 500, damping: 150 })

  useEffect(() => {
    const progressSpan = progressSpanRef.current
    if (!progressSpan) {
      // console.log('1')
      return
    }
    const container = containerRef.current

    let t

    const updateProgress = (progress: number) => {
      const [p, s] = dataInterpolation(progress)
      progressValue.set(progress)
      // progressSpan.innerText = p

      // if (p >= 99) {
      //   progressSpan.style.setProperty('--pretext', '""')
      // } else if (p > 9) {
      //   progressSpan.style.setProperty('--pretext', '0')
      // }

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
          }, defaultTimeout)
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
  }, [dataInterpolation, defaultTimeout, progressValue, setLoaded])

  useMotionValueEvent(progressSpring, 'change', (value) => {
    const v = 100 - value
    const p = value.toFixed(0)
    progressSpanRef.current.innerText = value.toFixed(0)
    if (p > 99) {
      progressSpanRef.current.style.setProperty('--pretext', '""')
    } else if (p > 9) {
      progressSpanRef.current.style.setProperty('--pretext', '"0"')
    }
    progressBarRef.current.style.setProperty('--progress', `-${v}%`)
  })

  return (
    <div className={cn(containerStyles, className)} ref={containerRef}>
      <div ref={progressSpanRef} className={textStyles}>
        0
      </div>
      <div ref={progressBarRef} className={progressBarStyles}></div>
    </div>
  )
}
const containerStyles = css({
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100dvw',
  height: '100dvh',
  transition: 'opacity 500ms ease',
  zIndex: 9999,
  overflowX: 'hidden',
  overflowY: 'hidden',
  opacity: 1,
})

const progressBarStyles = css({
  '--progress': '-100%',
  position: 'absolute',
  height: 2,
  backgroundColor: '$slate12',
  overflow: 'hidden',
  bottom: '$8',
  left: '$8',
  right: '$8',

  _after: {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '$slate11',
    zIndex: 1,
    transform: 'translate(var(--progress), 0)',
  },
})

const textStyles = css({
  position: 'absolute',
  right: '$8',
  bottom: '$9',
  lineHeight: '$none',
  fontSize: {
    base: '$8',
    md: '$10',
  },
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
