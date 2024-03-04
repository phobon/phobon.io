import { css } from '@/design/css'
import { cn } from '@/helpers/cn'
import { LayoutStore, useLayoutStore } from '@/stores/use_layout_store'
import { useProgress } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

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

export const Loader = ({
  dataInterpolation = customDataInterpolation,
  className,
  defaultTimeout = 500,
}: LoaderProps) => {
  const progressSpanRef = useRef(null)
  const { setLoaded, loaded } = useLayoutStore(setLoadedSelector)

  useEffect(() => {
    const progressSpan = progressSpanRef.current
    if (!progressSpan) {
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
          setLoaded(true)
          document.documentElement.style.cssText = '--backgroundColor: hsl(240, 22%, 99%);'
        }, defaultTimeout)
      } else {
        setLoaded(false)
        document.documentElement.style.cssText = '--backgroundColor: #060708;'
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
    <AnimatePresence>
      {!loaded ? (
        <motion.div
          className={cn(containerStyles, className)}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span ref={progressSpanRef} className={textStyles} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
const containerStyles = css({
  position: 'fixed',
  inset: 0,
  // transition: 'opacity 300ms ease',
  zIndex: 9999,
  overflowX: 'hidden',
  overflowY: 'hidden',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  padding: 48,
})

const textStyles = css({
  fontSize: '$10',
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
