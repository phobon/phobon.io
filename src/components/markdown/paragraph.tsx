import { css } from '@/design/css'
import { cn } from '@/helpers/cn'
import { forwardRef } from 'react'

export type ParagraphProps = {} & React.HTMLAttributes<HTMLParagraphElement>

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      css({
        fontSize: {
          base: '$4',
          md: '$5',
        },
        lineHeight: 1.8,
        color: 'foreground',
        mt: 0,
        mb: '$5',
        maxWidth: '80ch',
        gridColumn: '1 / -1',
      }),
      className,
    )}
    {...props}
  >
    {children}
  </p>
))
