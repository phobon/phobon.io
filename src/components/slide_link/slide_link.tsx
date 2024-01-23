'use client'

import { css } from '@/design/css'
import { Link } from '@/helpers/navigation_helpers'
import React from 'react'

export interface ISlideLinkProps {
  slideColor?: string
  current?: boolean
}

export type SlideLinkProps = ISlideLinkProps &
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

export const SlideLink = React.forwardRef<HTMLAnchorElement, SlideLinkProps>(
  ({ children, href, title, rel, current, slideColor, color = 'foreground', ...props }, ref) => (
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
          lineHeight: 'inherit',
          fontSize: 'inherit',
          fontFamily: 'inherit',
          backgroundImage: `linear-gradient($slate11, $slate7)`,
          backgroundPosition: '0% 95%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 22%',
        })}
      >
        <span
          ref={ref}
          className={css({
            lineHeight: 'inherit',
            fontSize: 'inherit',
            fontFamily: 'inherit',
            textDecoration: 'inherit',
            backgroundImage: `linear-gradient($purple7, $purple7)`,
            backgroundPosition: '0% 95%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${current ? '100%' : '0%'} 22%`,
            transition: 'background-size 90ms cubic-bezier(0.19, 1, 0.22, 1)',
            _hover: {
              backgroundSize: '100% 22%',
            },
            _focus: {
              backgroundSize: '100% 22%',
            },
            color: '$slate2',
          })}
        >
          {children}
        </span>
      </span>
    </Link>
  ),
)
