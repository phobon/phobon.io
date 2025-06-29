import Link from 'next/link'

import { cn } from '@/utils/cn'
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
          // top: 0,
          // position: 'sticky',
          overflow: 'hidden',
          flexDirection: 'column',
          py: '$4',
          zIndex: 1,
          fontSize: '$2',
        }),
        gridStyles,
        'phbn__header',
      )}
      {...props}
    >
      <div
        className={css({
          gridColumn: '1 / 6',
          pl: {
            base: '$4',
            md: '$5',
          },
          color: '$slate12',
          display: 'flex',
          alignItems: 'center',
          gap: '$5',
        })}
      >
        <Link href='/'>
          <Identity aria-label='Go home' />
        </Link>
        <div
          className={css({
            display: 'flex',
            lineHeight: '$tight',
            flexDirection: {
              base: 'column',
              lg: 'row',
            },
            gap: { base: 0, lg: '$2' },
          })}
        >
          <span>Ben McCormick</span>
          <span
            className={css({
              color: '$slate11',
            })}
          >
            Design Engineer
          </span>
        </div>
      </div>

      <div
        className={css({
          gridColumn: {
            base: '-2 / -1',
            md: '9 / span 1',
            lg: '11 / span 2',
          },
          color: '$slate12',
          textAlign: 'right',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: { base: 'flex-start', lg: 'center' },
          lineHeight: '$tight',
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
