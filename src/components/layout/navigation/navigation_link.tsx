import { SlideLink } from '@/components/slide_link'
import { css } from '@/design/css'

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
        <SlideLink href={href}>{label}</SlideLink>
      ) : (
        <SlideLink href={href} onClick={onClick}>
          {label}
        </SlideLink>
      )}
    </span>
  )
}
