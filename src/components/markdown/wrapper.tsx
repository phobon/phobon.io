import { css } from '@/design/css'
import React from 'react'

export const Wrapper = ({ children, ...props }) => (
  <div
    className={css({
      gridColumn: '1 / -1',
      width: '100%',
      px: '$5',
      pt: '$11',
      display: 'flex',
      flexDirection: 'column',
    })}
    {...props}
  >
    {children}
  </div>
)
