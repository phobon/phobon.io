'use client'

import { css } from '@/design/css'
import { forwardRef, useRef } from 'react'

import Text from '../canvas/webgl_text'
import { cn } from '@/helpers/cn'

export const SideStack = forwardRef<any, any>(({ title, children, className }, ref) => {
  const containerRef = useRef<HTMLUListElement>()
  return (
    <ul
      className={cn(
        css({
          display: 'flex',
          flexDirection: 'column',
          gap: '$1',
        }),
        className,
      )}
      ref={containerRef}
    >
      <li
        className={css({
          width: '100%',
        })}
      >
        <h2
          className={css({
            color: '#000',
          })}
        >
          <Text>Projects</Text>
        </h2>
      </li>

      {children}
    </ul>
  )
})
