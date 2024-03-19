import { css } from '@/design/css'
import { cn } from '@/helpers/cn'

export type CodeProps = {
  className?: string
} & React.HTMLAttributes<HTMLSpanElement>

export const codeStyles = css({
  textStyle: 'monospace',
  display: 'inline',
  fontSize: {
    base: '$3',
    md: '$4',
  },
  lineHeight: 'inherit',
  bg: '$purple3',
  color: '$purple11',
  px: '$2',
  py: '$1',
  gridColumn: '1 / -1',
})

export const Code = ({ className, children, ...props }: CodeProps) => (
  <span className={cn(codeStyles, className)} {...props}>
    {children}
  </span>
)
