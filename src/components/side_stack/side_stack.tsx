'use client'

import { css } from '@/design/css'
import { forwardRef } from 'react'

import { cn } from '@/utils/cn'

export const SideStack = forwardRef<HTMLUListElement, { title: string; children: React.ReactNode; className?: string }>(
  ({ title, children, className }, ref) => {
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
        ref={ref}
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
            {title}
          </h2>
        </li>

        {children}
      </ul>
    )
  },
)
