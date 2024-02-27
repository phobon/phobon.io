'use client'

import Link from 'next/link'

import { cn } from '@/helpers/cn'
import { css } from '@/design/css'
import Identity from '@/components/identity'
import { gridStyles } from '../common'

import { socialLinks } from '@/data/links'

export const Header = ({ ...props }) => {
  return (
    <header
      className={cn(
        css({
          width: '100%',
          top: 0,
          position: 'sticky',
          zIndex: 2,
          overflow: 'hidden',
          flexDirection: 'column',
          py: '$4',
          px: '$5',
        }),
        gridStyles,
        'phbn__header',
      )}
      {...props}
    >
      <Link
        href='/'
        className={css({
          gridColumn: '1 / span 1',
        })}
      >
        <Identity aria-label='Go home' />
      </Link>
      <nav
        className={css({
          gridColumn: '9 / span 1',
          display: {
            base: 'none',
            md: 'grid',
          },
          gridAutoRows: 'auto',
          alignItems: 'center',
          justifyContent: 'start',
          pl: '$4',
        })}
      >
        {socialLinks.map(({ id, label }) => (
          <a key={id} id={id} target='_blank' className={anchorStyles}>
            {label}
          </a>
        ))}
      </nav>

      <a
        className={cn(
          css({
            gridColumn: '12 / -1',
          }),
          anchorStyles,
        )}
        href='mailto:hello@phobon.io'
      >
        hello@phobon.io
      </a>
    </header>
  )
}

const anchorStyles = css({
  color: '$slate10',
  fontSize: '$3',
})
