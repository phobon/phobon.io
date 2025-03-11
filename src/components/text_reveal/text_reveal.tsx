'use client'

import { cn } from '@/utils/cn'
import React, { PropsWithChildren, forwardRef, useImperativeHandle, useRef } from 'react'
import { css } from '@/design/css'
import { animate, cubicBezier, stagger } from 'framer-motion'
import { useIsomorphicLayoutEffect } from '@/utils/use_isomorphic_layout_effect'
import SplitType from 'split-type'

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
      reveal = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<any>(null)
    useImperativeHandle(ref, () => containerRef.current)

    const initialisedRef = useRef(false)
    useIsomorphicLayoutEffect(() => {
      if (initialisedRef.current) {
        return
      }

      initialisedRef.current = true

      const text = new SplitType(containerRef.current, {
        lineClass: 'textreveal__segment__parent',
        types: 'lines',
      })

      if (text?.lines) {
        for (const line of text.lines) {
          const text = line.innerText
          const clone = line.cloneNode(false) as HTMLElement
          line.innerText = ''

          clone.classList.remove('textreveal__segment__parent')
          clone.classList.add(SEGMENT_CLASSNAME)
          clone.innerText = text
          line.appendChild(clone)
        }
      }
    }, [])

    const initialY = direction === 'up' ? '-100%' : '100%'

    useIsomorphicLayoutEffect(() => {
      if (!reveal) {
        return
      }

      const segments = containerRef.current.querySelectorAll(`.${SEGMENT_CLASSNAME}`)
      // @ts-ignore
      const easeFunction = cubicBezier(...ease)

      const y = [initialY, 0]
      const t = setTimeout(() => {
        animate(segments, { y }, { duration: segmentDuration, delay: stagger(segmentStagger), ease: easeFunction })
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
        {children}
      </Tag>
    )
  },
)
