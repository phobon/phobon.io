'use client'

import { css } from '@/design/css'
import { Link } from '@/helpers/navigation_helpers'
import React from 'react'
import { slate, purple } from '@radix-ui/colors'

export interface ISlideLinkProps {
  slideColor?: string
  current?: boolean
  fontSize?: any
  as?: any
}

export type SlideLinkProps = ISlideLinkProps &
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

export const SlideLink = React.forwardRef<HTMLAnchorElement, SlideLinkProps>(
  ({ children, href, title, rel, current, slideColor, fontSize, color = '$slate1', as, ...props }, ref) => (
    <Link
      className={css({
        overflow: 'hidden',
        zIndex: 1,
        lineHeight: 'inherit',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        _visited: {
          textDecoration: 'none',
        },
        _focus: {
          textDecoration: 'none',
        },
      })}
      href={href}
      title={title}
      rel={rel}
      {...props}
    >
      <span
        className={css({
          '--slideColor1': 'transparent',
          '--slideColor2': 'transparent',
          lineHeight: 'inherit',
          fontSize: 'inherit',
          fontFamily: 'inherit',
          backgroundImage: `linear-gradient(var(--slideColor1), var(--slideColor2))`,
          backgroundPosition: '0% 95%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 22%',
        })}
        style={{
          // @ts-ignore
          '--slideColor1': slate.slate5,
          '--slideColor2': slate.slate5,
        }}
      >
        <span
          ref={ref}
          className={css({
            '--slideColor1': 'transparent',
            '--slideColor2': 'transparent',
            '--progress': '0%',
            lineHeight: 'inherit',
            fontSize: 'inherit',
            fontFamily: 'inherit',
            textDecoration: 'inherit',
            backgroundImage: `linear-gradient(var(--slideColor1), var(--slideColor2))`,
            backgroundPosition: '0% 95%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'var(--progress) 22%',
            transition: 'background-size 90ms cubic-bezier(0.19, 1, 0.22, 1)',
            _hover: {
              '--progress': '100%',
            },
            _focus: {
              '--progress': '100%',
            },
            color: '$slate10',
          })}
          style={{
            // @ts-ignore
            '--slideColor1': purple.purple7,
            '--slideColor2': purple.purple7,
          }}
        >
          {children}
        </span>
      </span>
    </Link>
  ),
)
