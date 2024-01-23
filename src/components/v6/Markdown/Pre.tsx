/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react'
import { Text } from '@/components/v6/Base/Core'

// TODO: Export TextProps from @/components/Base/Core

export const Pre = React.forwardRef<HTMLPreElement, any>(({ children, ...props }, ref) => (
  <Text
    as='pre'
    ref={ref}
    css={(theme) => ({
      borderRadius: `${theme.radii[4]}px`,
      '> code': {
        fontSize: 'inherit',
        lineHeight: 'inherit',
      },
    })}
    {...props}
  >
    {children}
  </Text>
))

Pre.defaultProps = {
  fontSize: [3, 4],
  lineHeight: 1.8,
  mt: 0,
  mb: 5,
  bg: 'grayscale.1',
  color: 'grayscale.9',
  px: 3,
  py: 2,
}
