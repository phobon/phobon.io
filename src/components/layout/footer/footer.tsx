import { socialLinks } from '@/data/links'
import { SlideLink } from '@/components/slide_link'
import { cn } from '@/helpers/cn'
import { css } from '@/design/css'

export const Footer = ({ ...props }) => (
  <footer
    className={cn(
      css({
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '$5',
        px: '$5',
        pt: {
          base: 0,
          md: '$6',
        },
        pb: '$3',
      }),
      'phbn__footer',
    )}
    {...props}
  >
    {socialLinks.map(({ id, label, href }) => (
      <SlideLink key={id} href={href} fontSize={[3, 5]}>
        {label}
      </SlideLink>
    ))}
  </footer>
)
