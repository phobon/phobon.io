import React, { forwardRef } from 'react'
import { css } from '@/design/css'
import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'

const headingStyles = css({
  color: '$slate12',
  fontWeight: 'light',
  lineHeight: 1,
  mt: 0,
  mb: '$4',
  gridColumn: '1 / -1',
})

const ease = [0.33, 1, 0.68, 1]

export const H1 = forwardRef<HTMLHeadingElement, any>(({ className, children, ...props }, ref) => {
  return (
    <motion.h1
      className={cn(
        headingStyles,
        css({
          width: '100%',
          color: '$slate12',
          fontWeight: 'light',
          gridColumn: '1 / -1',
          fontSize: {
            base: '$9',
            md: '$11',
          },
          mb: {
            base: '$7',
            md: '$6',
          },
          lineHeight: {
            base: '$2',
            md: '$1',
          },
          '&> span': {
            display: 'inline-table',
          },
        }),
        className,
      )}
      variants={{
        visible: {
          translateY: 0,
          opacity: 1,
          transition: {
            duration: 0.5,
            delay: 0,
            ease,
          },
        },
        initial: {
          translateY: 16,
          opacity: 0,
        },
      }}
      initial='initial'
      animate='visible'
      {...props}
    >
      {children}
    </motion.h1>
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
