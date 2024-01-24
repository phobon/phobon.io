import { cva } from '@/design/css'
import { forwardRef } from 'react'

export const spacerStyles = cva({
  base: {
    '--length': '100%',
    direction: 'horizontal',
    bg: '$slate3',
    display: 'block',
    minWidth: 0,
  },

  variants: {
    direction: {
      horizontal: {
        width: 'var(--length)',
        height: '2px',
      },
      vertical: {
        width: '2px',
        height: 'var(--length)',
      },
    },
    size: {
      small: {
        '--length': '50%',
      },
      medium: {
        '--length': '75%',
      },
      large: {
        '--length': '100%',
      },
    },
  },
})

export type SpacerProps = {
  direction?: 'horizontal' | 'vertical'
  size?: 'small' | 'medium' | 'large'
} & React.HTMLAttributes<HTMLSpanElement>

export const Spacer = forwardRef<HTMLSpanElement, SpacerProps>(
  ({ direction = 'horizontal', size = 'large', ...props }, ref) => {
    return <span className={spacerStyles({ direction, size })} ref={ref} {...props} />
  },
)
