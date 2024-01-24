'use client'

import Link from 'next/link'
import { navigationLinks } from '@/data/links'

import { NavigationLink } from '@/components/layout/navigation'
import { cn } from '@/helpers/cn'
import { css } from '@/design/css'
import { Spacer } from '@/components/primitives/spacer'
import { Button } from '@/components/primitives/button'
import { HamburgerGlyph } from '@/components/glyphs/hambrger_glyph'
import Identity from '@/components/identity'

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
          backdropFilter: 'blur(8px)',

          display: 'flex',
          flexDirection: 'column',
          px: '$5',

          _after: {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: '$slate1',
            opacity: 0.7,
            zIndex: -1,
          },
        }),
        'phbn__header',
      )}
      {...props}
    >
      <section
        className={css({
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: '$4',
        })}
      >
        <Link href='/'>
          <Identity aria-label='Go home' />
        </Link>
        <nav
          className={css({
            display: {
              base: 'none',
              md: 'flex',
            },
            alignItems: 'center',
            justifyContent: 'center',
            gap: '$3',
          })}
        >
          {navigationLinks.slice(1).map(({ id, ...rest }) => (
            <NavigationLink key={id} id={id} fontSize={5} {...rest} />
          ))}
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
      </section>

      <Spacer />
    </header>
  )
}
