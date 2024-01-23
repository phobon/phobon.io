/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react'
import styled from '@emotion/styled'
import {
  fullWidth,
  fullHeight,
  focus,
  gridPosition,
  shouldForwardProp,
  FullWidthProps,
  FullHeightProps,
  GridPositionProps,
} from '../utils'
import {
  variant,
  compose,
  space,
  layout,
  border,
  flexbox,
  typography,
  position,
  SpaceProps,
  LayoutProps,
  BorderProps,
  FlexboxProps,
  TypographyProps,
  PositionProps,
} from 'styled-system'

const variants = {
  primary: {
    color: 'white',
    fill: 'white',
    bg: 'accent.4',
    '&:hover': {
      bg: 'accent.2',
    },
    '&[aria-pressed="true"]': {
      bg: 'accent.2',
      '&:hover': {
        bg: 'accent.4',
      },
    },
  },
  secondary: {
    color: 'grayscale.1',
    fill: 'grayscale.1',
    bg: 'grayscale.8',
    '&:hover': {
      bg: 'grayscale.7',
    },
    '&[aria-pressed="true"]': {
      bg: 'grayscale.2',
      color: 'grayscale.9',
      '&:hover': {
        bg: 'grayscale.4',
      },
    },
  },
  tertiary: {
    color: 'grayscale.1',
    fill: 'grayscale.1',
    bg: 'transparent',
    '&:hover': {
      bg: 'grayscale.7',
    },
    '&[aria-pressed="true"]': {
      bg: 'grayscale.2',
      color: 'grayscale.9',
      '&:hover': {
        bg: 'grayscale.4',
      },
    },
  },
  warning: {
    bg: 'guidance.warning.1',
    color: 'guidance.warning.0',
    fill: 'guidance.warning.0',
    '&:hover': {
      bg: 'oranges.7',
    },
    '&[aria-pressed="true"]': {
      bg: 'oranges.6',
      '&:hover': {
        bg: 'oranges.7',
      },
    },
  },
  danger: {
    bg: 'guidance.error.1',
    color: 'guidance.error.0',
    fill: 'guidance.error.0',
    '&:hover': {
      bg: 'reds.7',
    },
    '&[aria-pressed="true"]': {
      bg: 'reds.6',
      '&:hover': {
        bg: 'reds.7',
      },
    },
  },
  success: {
    bg: 'guidance.success.1',
    color: 'guidance.success.0',
    fill: 'guidance.success.0',
    '&:hover': {
      bg: 'greens.7',
    },
    '&[aria-pressed="true"]': {
      bg: 'greens.6',
      '&:hover': {
        bg: 'greens.7',
      },
    },
  },
  link: {
    bg: 'transparent',
    border: 'none',
    color: 'grayscale.1',
    fill: 'grayscale.1',
    padding: 0,
    textDecoration: 'underline dotted',
    '&:hover': {
      color: 'accent.2',
      fill: 'accent.2',
      textDecoration: 'underline',
    },
    '&[aria-pressed="true"]': {
      color: 'accent.4',
      fill: 'accent.4',
      textDecoration: 'underline',
      '&:hover': {
        color: 'grayscale.1',
        fill: 'grayscale.1',
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
}

const buttonShape = ({ shape }) => {
  const shapes = {
    default: {},
    circle: {
      paddingLeft: 0,
      paddingRight: 0,
      borderRadius: '50%',
    },
    square: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  }

  return shapes[shape]
}

const buttonSize = ({ theme, pl, pr, size }) => {
  const sizes = {
    s: {
      minWidth: theme.space[4],
      height: theme.space[4],
      paddingLeft: theme.space[pl || 2],
      paddingRight: theme.space[pr || 2],
    },
    m: {
      minWidth: theme.space[5],
      height: theme.space[5],
      paddingLeft: theme.space[pl || 3],
      paddingRight: theme.space[pr || 3],
    },
    l: {
      minWidth: theme.space[6],
      height: theme.space[6],
      paddingLeft: theme.space[pl || 3],
      paddingRight: theme.space[pr || 3],
    },
  }

  return sizes[size]
}

const buttonSystem = compose(space, layout, border, flexbox, typography, position, fullWidth, fullHeight, gridPosition)

export interface IButtonProps {
  toggled?: boolean
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'success' | 'link' | 'clean'
  shape?: 'default' | 'circle' | 'square'
  size?: 's' | 'm' | 'l'
}

type StyledButtonProps = IButtonProps &
  SpaceProps &
  LayoutProps &
  BorderProps &
  FlexboxProps &
  TypographyProps &
  PositionProps &
  FullWidthProps &
  FullHeightProps &
  GridPositionProps

const StyledButton = styled('button', {
  shouldForwardProp,
})<ButtonProps>(
  ({ theme }: any) => ({
    boxSizing: 'border-box',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 120ms ease-out',
    '&:disabled': {
      opacity: 0.5,
      backgroundColor: theme.colors.grayscale[7],
      border: 0,
      color: theme.colors.grayscale[4],
      fill: theme.colors.grayscale[4],
      pointerEvents: 'none',
    },
  }),
  buttonSystem,
  variant({ variants }),
  focus,
)

export type ButtonProps = StyledButtonProps &
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, toggled, shape, size, pl, pr, ...props }, ref) => (
    <StyledButton
      aria-pressed={toggled ? 'true' : undefined}
      toggled={toggled}
      ref={ref}
      css={(theme) => ({
        ...buttonSize({ theme, pl, pr, size }),
        ...buttonShape({ shape }),
      })}
      {...props}
    >
      {children}
    </StyledButton>
  ),
)

Button.displayName = 'Button'

Button.defaultProps = {
  display: 'flex',
  flex: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  border: 0,
  fontSize: 1,
  borderRadius: 3,
  borderColor: 'grayscale.5',
  toggled: false,
  variant: 'secondary',
  size: 'm',
  type: 'button',
  shape: 'default',
}
