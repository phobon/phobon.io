'use client'

import { cn } from '@/helpers/cn'
import React, { PropsWithChildren, forwardRef, useImperativeHandle, useLayoutEffect, useRef } from 'react'
import { css } from '@/design/css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitType from 'split-type'
import { useIsomorphicLayoutEffect } from '@/helpers/use_isomorphic_layout_effect'

export type TextRevealProps = {
  as?: string
  direction?: 'up' | 'down'
  delay?: number
  segmentDuration?: number
  segmentStagger?: number
  types?: 'letters' | 'words' | 'chars'
} & React.HTMLAttributes<HTMLDivElement> &
  any

const SEGMENT_CLASSNAME = 'textreveal__segment'

export const TextReveal = forwardRef<HTMLSpanElement, PropsWithChildren<TextRevealProps>>(
  (
    {
      as: Tag = 'span',
      direction = 'down',
      segmentDuration = 0.5,
      segmentStagger = 0.1,
      types = 'line',
      className,
      children,
      markers = false,
      scrollTrigger = false,
      start = 'top 80%',
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<any>()
    const hostRef = useRef<any>()
    useImperativeHandle(ref, () => containerRef.current)

    useGSAP(
      () => {
        if (types === 'lines') {
          const text = new SplitType(hostRef.current, {
            lineClass: 'textreveal__segment__parent',
            types,
          })

          for (const line of text.lines) {
            const text = line.innerText
            const clone = line.cloneNode(false) as HTMLElement
            line.innerText = ''

            clone.classList.remove('textreveal__segment__parent')
            clone.classList.add(SEGMENT_CLASSNAME)
            clone.innerText = text
            line.appendChild(clone)
          }
        } else {
          new SplitType(hostRef.current, {
            lineClass: SEGMENT_CLASSNAME,
            wordClass: SEGMENT_CLASSNAME,
            charClass: SEGMENT_CLASSNAME,
            types,
          })
        }

        const initialY = direction === 'up' ? '-100%' : '100%'
        gsap.from(`.${SEGMENT_CLASSNAME}`, {
          y: initialY,
          stagger: segmentStagger,
          duration: segmentDuration,
          scrollTrigger: {
            trigger: hostRef.current,
            start,
            markers,
          },
        })
      },
      { scope: hostRef, dependencies: [types, markers, start] },
    )

    return (
      <Tag
        {...props}
        className={cn(
          className,
          'textreveal__host',
          css({
            position: 'relative',
            lineHeight: '$none',
            display: 'inline-block',
          }),
        )}
        ref={hostRef}
      >
        {children}
      </Tag>
    )
  },
)
