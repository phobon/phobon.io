import { cva } from '@/design/css'
import { cn } from '@/utils/cn'
import { forwardRef } from 'react'

export type ButtonProps = {
  toggled?: boolean
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 's' | 'm' | 'l'
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'secondary', toggled = false, size = 'm', className, children, ...props }, ref) => (
    <button
      aria-pressed={toggled ? 'true' : undefined}
      type='button'
      ref={ref}
      className={cn(buttonStyles({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  ),
)

export const buttonStyles = cva({
  base: {
    display: 'flex',
    flex: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    border: 0,
    fontSize: 1,
    borderRadius: 3,
    borderColor: 'grayscale.5',
    boxSizing: 'border-box',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 120ms ease-out',

    _disabled: {
      opacity: 0.5,
      backgroundColor: '$slate5',
      border: 0,
      color: '$slate7',
      fill: '$slate7',
      pointerEvents: 'none',
    },
  },

  variants: {
    variant: {
      primary: {
        color: '#fff',
        fill: '#fff',
        bg: '$purple6',
        _hover: {
          bg: '$purple5',
        },
        '&[aria-pressed="true"]': {
          bg: '$purple5',
          _hover: {
            bg: '$purple6',
          },
        },
      },
      secondary: {
        color: '$slate10',
        fill: '$slate10',
        bg: '$slate6',
        _hover: {
          bg: '$slate5',
        },
        '&[aria-pressed="true"]': {
          bg: '$slate5',
          color: '$slate11',
          _hover: {
            bg: '$slate4',
          },
        },
      },
      tertiary: {
        color: '$slate10',
        fill: '$slate10',
        bg: 'transparent',
        _hover: {
          bg: '$slate5',
        },
        '&[aria-pressed="true"]': {
          bg: '$slate5',
          color: '$slate11',
          _hover: {
            bg: '$slate4',
          },
        },
      },
      link: {
        bg: 'transparent',
        border: 'none',
        color: '$slate10',
        fill: '$slate10',
        padding: 0,
        textDecoration: 'underline dotted',
        _hover: {
          color: '$purple5',
          fill: '$purple5',
          textDecoration: 'underline',
        },
        '&[aria-pressed="true"]': {
          color: '$purple6',
          fill: '$purple6',
          textDecoration: 'underline',
          _hover: {
            color: '$slate10',
            fill: '$slate10',
            textDecoration: 'underline dotted',
          },
        },
      },
      clean: {
        bg: 'transparent',
        border: 0,
        color: 'inherit',
        fill: 'inherit',
        padding: 0,
        width: 'unset',
        height: 'unset',
      },
    },

    size: {
      s: {
        minWidth: '$4',
        height: '$4',
        px: '$2',
      },
      m: {
        minWidth: '$5',
        height: '$5',
        px: '$3',
      },
      l: {
        minWidth: '$6',
        height: '$6',
        px: '$3',
      },
    },
  },
})
