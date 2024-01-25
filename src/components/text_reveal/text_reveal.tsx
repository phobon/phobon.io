'use client'

import { cn } from '@/helpers/cn'
import React, { PropsWithChildren, forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import { css } from '@/design/css'
import { motion, animate, cubicBezier, stagger } from 'framer-motion'

type CubicBezierType = [number, number, number, number]

const easeOutExpoCurve: CubicBezierType = [0.19, 1, 0.22, 1]

export type TextRevealProps = {
  direction?: 'up' | 'down'
  delay?: number
  segmentDuration?: number
  segmentStagger?: number
  type?: 'letter' | 'word' | 'line'
  ease?: CubicBezierType
  reveal?: boolean
  inline?: boolean
} & React.HTMLAttributes<HTMLHeadingElement>

const SEGMENT_CLASSNAME = 'textreveal__letter'

const parseTextChildren = (child: any, type: any, className?: string) => {
  const childrenString = child.toString()
  let t
  if (type === 'word') {
    t = childrenString.split(' ').map((word, index, arr) => (arr.length - 1 !== index ? `${word}\u00A0` : word))
  } else if (type === 'line') {
    t = [childrenString]
  } else {
    t = childrenString.split('').map((letter) => (letter === ' ' ? '\u00A0' : letter))
  }

  return t.map((segment) => {
    return {
      text: segment,
      className,
    }
  })
}

export const TextReveal = forwardRef<HTMLSpanElement, PropsWithChildren<TextRevealProps>>(
  (
    {
      direction = 'down',
      delay = 50,
      segmentDuration = 0.5,
      segmentStagger = 0.02,
      type = 'line',
      ease = easeOutExpoCurve,
      className,
      reveal = false,
      inline = false,
      children,
      ...props
    },
    ref,
  ) => {
    const spanRef = useRef<HTMLSpanElement>()
    useImperativeHandle(ref, () => spanRef.current)

    const allSegments = useMemo(() => {
      const segments = []

      // If there are multiple children, we need to parse each one
      if (Array.isArray(children)) {
        for (const child of React.Children.toArray(children)) {
          const childAsAny = child as any
          const { children, className } = childAsAny.props
          const t = parseTextChildren(children, type, className)
          segments.push(...t)
        }
      } else {
        const t = parseTextChildren(children, type, null)
        segments.push(...t)
      }

      return segments
    }, [children, type])

    const initialY = direction === 'up' ? '-100%' : '100%'

    useEffect(() => {
      const segments = spanRef.current.querySelectorAll(`.${SEGMENT_CLASSNAME}`)
      const easeFunction = cubicBezier(...ease)
      const t = setTimeout(() => {
        animate(
          segments,
          { y: reveal ? 0 : initialY },
          { duration: segmentDuration, delay: segmentStagger ? stagger(segmentStagger) : 0, ease: easeFunction },
        )
      }, delay)

      return () => {
        clearTimeout(t)
      }
    }, [delay, direction, ease, initialY, reveal, segmentDuration, segmentStagger])

    return (
      <span
        {...props}
        className={cn(
          css({
            position: 'relative',
            overflow: 'hidden',
            lineHeight: '$tight',
            display: 'inline-block',
          }),
          className,
        )}
        ref={spanRef}
      >
        {allSegments.map((segment, index) => {
          const { text, className } = segment
          return (
            <span
              key={`${segment}__${index}`}
              className={cn(
                css({ display: inline ? 'inline-block' : 'block', lineHeight: 'inherit', overflowY: 'hidden' }),
                className,
              )}
            >
              <motion.span
                style={{ y: initialY }}
                className={cn(SEGMENT_CLASSNAME, css({ display: 'inherit', lineHeight: 'inherit' }))}
              >
                {text}
              </motion.span>
            </span>
          )
        })}
      </span>
    )
  },
)
