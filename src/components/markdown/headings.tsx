import React, { forwardRef } from 'react'
import HeroHeader from '../hero_header'
import { css } from '@/design/css'
import { cn } from '@/helpers/cn'

const headingStyles = css({
  color: '$slate12',
  fontWeight: 'light',
  lineHeight: 1,
  mt: 0,
  mb: '$4',
  gridColumn: '1 / -1',
})

export const H1 = forwardRef<HTMLHeadingElement, any>(({ className, children, ...props }, ref) => {
  return (
    <HeroHeader
      className={cn(
        headingStyles,
        css({
          mb: {
            base: '$7',
            md: '$6',
          },
        }),
        className,
      )}
      {...props}
      ref={ref}
    >
      {children}
    </HeroHeader>
  )
})
H1.displayName = 'H1'

export const H2 = forwardRef<HTMLHeadingElement, any>(({ className, children, ...props }, ref) => (
  <h2
    className={cn(
      headingStyles,
      css({
        fontSize: {
          base: '$7',
          md: '$9',
        },
        mt: '$7',
      }),
      className,
    )}
    {...props}
    ref={ref}
  >
    {children}
  </h2>
))
H2.displayName = 'H2'

export const H3 = forwardRef<HTMLHeadingElement, any>(({ className, children, ...props }, ref) => (
  <h3
    className={cn(
      headingStyles,
      css({
        fontSize: {
          base: '$6',
          md: '$8',
        },
        mt: '$7',
      }),
      className,
    )}
    {...props}
    ref={ref}
  >
    {children}
  </h3>
))
H3.displayName = 'H3'
