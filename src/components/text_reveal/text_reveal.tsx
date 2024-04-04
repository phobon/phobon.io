'use client'

import { cn } from '@/helpers/cn'
import React, { PropsWithChildren, forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import { css } from '@/design/css'
import { motion, animate, cubicBezier, stagger } from 'framer-motion'

type CubicBezierType = [number, number, number, number]

const easeOutExpoCurve: CubicBezierType = [0.19, 1, 0.22, 1]

export type TextRevealProps = {
  as?: string
  direction?: 'up' | 'down'
  delay?: number
  segmentDuration?: number
  segmentStagger?: number
  type?: 'letter' | 'word' | 'line'
  ease?: CubicBezierType
  reveal?: boolean
} & React.HTMLAttributes<HTMLDivElement> &
  any

const SEGMENT_CLASSNAME = 'textreveal__segment'

export const TextReveal = forwardRef<HTMLSpanElement, PropsWithChildren<TextRevealProps>>(
  (
    {
      as: Tag = 'span',
      direction = 'down',
      delay = 50,
      segmentDuration = 0.5,
      segmentStagger = 0.02,
      type = 'line',
      ease = easeOutExpoCurve,
      className,
      reveal = false,
      children,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<any>()
    useImperativeHandle(ref, () => containerRef.current)

    const allSegments = useMemo(() => {
      const childrenString = children.toString()
      let t
      if (type === 'word') {
        t = childrenString.split(' ').map((word, index, arr) => (arr.length - 1 !== index ? [word, '\u00A0'] : word))
      } else if (type === 'line') {
        t = [childrenString]
      } else {
        t = childrenString.split('').map((letter) => (letter === ' ' ? '\u00A0' : letter))
      }

      return t
    }, [children, type])

    const initialY = direction === 'up' ? '-100%' : '100%'

    useEffect(() => {
      const segments = containerRef.current.querySelectorAll(`.${SEGMENT_CLASSNAME}`)
      // @ts-ignore
      const easeFunction = cubicBezier(...ease)
      const t = setTimeout(() => {
        animate(
          segments,
          { y: reveal ? 0 : initialY },
          { duration: segmentDuration, delay: stagger(segmentStagger), ease: easeFunction },
        )
      }, delay)

      return () => {
        clearTimeout(t)
      }
    }, [delay, direction, ease, initialY, reveal, segmentDuration, segmentStagger])

    return (
      <Tag
        {...props}
        className={cn(
          className,
          css({
            position: 'relative',
            overflow: 'hidden',
            lineHeight: '$none',
            display: 'inline-block',
          }),
        )}
        ref={containerRef}
      >
        {allSegments.map((letter, index) => {
          return (
            <motion.span
              style={{ y: initialY }}
              className={cn(SEGMENT_CLASSNAME, css({ display: 'inline-block', lineHeight: 'inherit' }))}
              key={`${letter}__${index}`}
            >
              {letter}
            </motion.span>
          )
        })}
      </Tag>
    )
  },
)
