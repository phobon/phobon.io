import Link from 'next/link'

import { cn } from '@/helpers/cn'
import { css } from '@/design/css'
import Identity from '@/components/identity'
import { gridStyles } from '../common'

import { socialLinks } from '@/data/links'
import { anchorStyles } from '@/components/primitives/anchor'

export const Header = ({ ...props }) => {
  return (
    <header
      className={cn(
        css({
          width: '100%',
          top: 0,
          position: 'sticky',
          overflow: 'hidden',
          flexDirection: 'column',
          py: '$4',
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
          pl: {
            base: '$4',
            md: '$5',
          },
        })}
      >
        <Identity aria-label='Go home' />
      </Link>
      <nav
        className={css({
          gridColumn: {
            base: 'initial',
            md: '7 / span 1',
            lg: '9 / span 1',
          },
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

      <div
        className={css({
          gridColumn: {
            base: '-2 / -1',
            md: '9 / span 1',
            lg: '11 / span 2',
          },
          color: '#000',
          textAlign: 'right',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          pr: {
            base: '$4',
            md: '$5',
          },
        })}
      >
        <a href='mailto:hello@phobon.io' className={anchorStyles}>
          hello@phobon.io
        </a>
      </div>
    </header>
  )
}
