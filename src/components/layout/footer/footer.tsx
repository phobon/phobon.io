import { cn } from '@/utils/cn'
import { css } from '@/design/css'
import { gridStyles } from '../common'
import { anchorStyles } from '@/components/primitives/anchor'
import { socialLinks } from '@/data/links'

export const Footer = ({ ...props }) => {
  return (
    <footer
      className={cn(
        css({
          width: '100%',
          top: 0,
          overflow: 'hidden',
          alignItems: 'start',
          justifyContent: 'start',
          pb: '$5',
          gridRowGap: {
            base: '$5',
            md: 0,
          },
        }),
        gridStyles,
        'phbn__footer',
      )}
      {...props}
    >
      <div
        className={css({
          gridColumn: '1 / span 2',
          fontSize: '$2',
          lineHeight: '$none',
          color: '$slate11',
          pl: '$5',
        })}
      >
        © {new Date().getFullYear()}
      </div>

      <nav
        className={css({
          gridColumn: {
            base: '1 / -1',
            md: '3 / span 1',
            lg: '4 / span 1',
          },
          display: {
            base: 'grid',
          },
          px: { base: '$5', md: 0 },
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
            base: '1 / -1',
            md: '5 / span 3',
            lg: '9 / span 3',
          },
          display: {
            base: 'grid',
          },
          px: { base: '$5', md: 0 },
          fontSize: '$2',
          lineHeight: '$none',
          color: '$slate11',
        })}
      >
        All rights reserved
      </div>

      <div
        className={css({
          gridColumn: {
            base: '1 / -1',
            md: '-2 / -1',
          },
          textAlign: { base: 'left', md: 'right' },
          fontSize: '$2',
          lineHeight: '$none',
          color: '$slate11',
          pr: { base: 'initial', md: '$5' },
          px: { base: '$5', md: 0 },
        })}
      >
        phobon.io
      </div>
    </footer>
  )
}
