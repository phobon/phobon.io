import Text from '@/components/canvas/webgl_text'
import SlideLink from '@/components/slide_link'
import { css } from '@/design/css'
import Link from 'next/link'

export type NavigationLinkProps = {
  id?: string | number
  label?: string
  href?: string
  external?: boolean
  fontSize?: number
} & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

export const NavigationLink = ({ label, href, external = false, onClick, ...props }: NavigationLinkProps) => {
  return (
    <span
      className={css({
        overflow: 'hidden',
      })}
      {...props}
    >
      {external ? (
        <a href={href}>{label}</a>
      ) : (
        <Link href={href} onClick={onClick}>
          <Text>{label}</Text>
        </Link>
      )}
    </span>
  )
}
