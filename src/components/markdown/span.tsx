import { css } from '@/design/css'
import { cn } from '@/helpers/cn'

export type SpanProps = {} & React.HTMLAttributes<HTMLSpanElement>

export const Span = ({ className, children, ...props }: SpanProps) => (
  <span
    className={cn(
      css({
        lineHeight: 'inherit',
        display: 'inline-flex',
      }),
      className,
    )}
    {...props}
  >
    {children}
  </span>
)
