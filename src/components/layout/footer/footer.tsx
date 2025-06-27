import { cn } from '@/utils/cn'
import { css } from '@/design/css'
import { gridStyles } from '../common'

export const Footer = ({ ...props }) => {
  return (
    <footer
      className={cn(
        css({
          width: '100%',
          top: 0,
          overflow: 'hidden',
          alignItems: 'end',
          justifyContent: 'start',
          px: '$5',
          pb: '$4',
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
        })}
      >
        © {new Date().getFullYear()}
      </div>

      <div
        className={css({
          gridColumn: {
            base: 'initial',
            md: '7 / span 3',
            lg: '9 / span 3',
          },
          display: {
            base: 'none',
            md: 'grid',
          },
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
            base: '-2 / -1',
          },
          textAlign: 'right',
          fontSize: '$2',
          lineHeight: '$none',
          color: '$slate11',
        })}
      >
        phobon
      </div>
    </footer>
  )
}
