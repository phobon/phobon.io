import { cn } from '@/helpers/cn'
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
          flexDirection: 'column',
          backgroundColor: '$slate12',
        }),
        gridStyles,
        'phbn__footer',
      )}
      {...props}
    ></footer>
  )
}
