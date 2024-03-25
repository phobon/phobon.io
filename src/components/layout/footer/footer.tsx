import { cn } from '@/helpers/cn'
import { css } from '@/design/css'
import { gridStyles } from '../common'
import Text from '@/components/canvas/webgl_text'

export const Footer = ({ ...props }) => {
  return (
    <footer
      className={cn(
        css({
          width: '100%',
          top: 0,
          overflow: 'hidden',
          backgroundColor: '$slate12',
          alignItems: 'end',
          justifyContent: 'start',
          height: '15dvh',
          px: '$5',
          pb: '$4',
        }),
        gridStyles,
        'phbn__footer',
      )}
      {...props}
    >
      <Text
        className={css({
          gridColumn: '1 / span 1',
          fontSize: '$3',
          color: '$slate1',
          lineHeight: '$none',
        })}
      >
        © {new Date().getFullYear()}
      </Text>

      <Text
        className={css({
          gridColumn: {
            base: 'initial',
            md: '7 / span 2',
            lg: '9 / span 2',
          },
          display: {
            base: 'none',
            md: 'grid',
          },
          fontSize: '$3',
          color: '$slate1',
          lineHeight: '$none',
        })}
      >
        All rights reserved
      </Text>

      <Text
        className={css({
          gridColumn: {
            base: '-2 / -1',
          },
          textAlign: 'right',
          fontSize: '$3',
          color: '$slate1',
          lineHeight: '$none',
        })}
      >
        phobon
      </Text>
    </footer>
  )
}
