'use client'

import Link from 'next/link'
import { navigationLinks } from '@/data/links'

import { NavigationLink } from '@/components/layout/navigation'
import { cn } from '@/helpers/cn'
import { css } from '@/design/css'
import { Button } from '@/components/primitives/button'
import { HamburgerGlyph } from '@/components/glyphs/hamburger_glyph'
import Identity from '@/components/identity'
import { gridStyles } from '../common'

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
          gridColumn: '3 / -2',
          display: {
            base: 'none',
            md: 'grid',
          },
          gridTemplateColumns: 'subgrid',
          gridTemplateRows: 'subgrid',
          alignItems: 'center',
          justifyContent: 'start',
        })}
      >
        {/* {navigationLinks.slice(1).map(({ id, ...rest }) => (
          <NavigationLink key={id} id={id} fontSize={5} {...rest} />
        ))} */}
      </nav>
      <Button
        aria-label='Open menu'
        variant='tertiary'
        onClick={() => {
          // TODO
        }}
        className={css({
          display: {
            base: 'flex',
            md: 'none',
          },
        })}
      >
        <HamburgerGlyph />
      </Button>
    </header>
  )
}
