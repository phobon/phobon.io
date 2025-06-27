import { css } from '@/design/css'
import { forwardRef, useRef } from 'react'

import { cn } from '@/utils/cn'

export const SideStack = ({ title, children, className, ref }: any) => {
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
}
