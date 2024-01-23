import { css } from '@/design/css'
import { cn } from '@/helpers/cn'
import { useProgress } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useEffect, useRef, useState } from 'react'

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
  onShownChanged?: (shown: boolean) => void
  className?: string
  defaultTimeout?: number
}

export const Loader = ({
  dataInterpolation = customDataInterpolation,
  onShownChanged,
  className,
  defaultTimeout = 0,
}: LoaderProps) => {
  const { active, progress } = useProgress()
  const progressRef = useRef(0)
  const rafRef = useRef(0)
  const progressSpanRef = useRef(null)
  const [shown, setShown] = useState(true)

  useEffect(() => {
    let t
    if (active !== shown) {
      t = setTimeout(() => {
        setShown(active)
        onShownChanged && onShownChanged(active)
      }, defaultTimeout)
      return () => clearTimeout(t)
    }
  }, [shown, active, onShownChanged, defaultTimeout])

  const updateProgress = useCallback(() => {
    if (!progressSpanRef.current) {
      return
    }

    progressRef.current += (progress - progressRef.current) / 2
    if (progressRef.current > 0.95 * progress || progress === 100) {
      progressRef.current = progress
    }

    const [p, s] = dataInterpolation(progressRef.current)
    progressSpanRef.current.innerText = p

    if (p >= 99) {
      progressSpanRef.current.style.cssText = '--pretext: ""'
    } else if (p > 9) {
      progressSpanRef.current.style.cssText = '--pretext: "0"'
    }

    if (progressRef.current < progress) {
      rafRef.current = requestAnimationFrame(updateProgress)
    }
  }, [dataInterpolation, progress])

  useEffect(() => {
    updateProgress()
    return () => cancelAnimationFrame(rafRef.current)
  }, [updateProgress])

  return (
    <AnimatePresence>
      {shown ? (
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
  transition: 'opacity 300ms ease',
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
