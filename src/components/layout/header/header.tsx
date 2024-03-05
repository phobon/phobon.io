'use client'

import Link from 'next/link'

import { cn } from '@/helpers/cn'
import { css } from '@/design/css'
import Identity from '@/components/identity'
import { gridStyles } from '../common'

import { socialLinks } from '@/data/links'
import { useLayoutStore } from '@/stores/use_layout_store'
import Text from '@/components/canvas/webgl_text'

export const Header = ({ ...props }) => {
  const loaded = useLayoutStore((state) => state.loaded)
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
        }),
        gridStyles,
        'phbn__header',
      )}
      style={{
        opacity: loaded ? 1 : 0,
      }}
      {...props}
    >
      <Link
        href='/'
        className={css({
          gridColumn: '1 / span 1',
          pl: '$5',
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
        })}
      >
        {socialLinks.map(({ id, label, href }) => (
          <a key={id} target='_blank' href={href} className={anchorStyles}>
            {label}
          </a>
        ))}
      </nav>

      <a
        href='mailto:hello@phobon.io'
        className={css({
          gridColumn: '11 / span 2',
          color: '#000',
          fontSize: 16,
          textAlign: 'right',
          pr: '$5',
        })}
      >
        hello@phobon.io
      </a>
    </header>
  )
}

const anchorStyles = css({
  color: '$slate12',
  fontSize: 16,
  display: 'flex',
})
