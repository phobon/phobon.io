import { css } from '@/design/css'
import { cn } from '@/helpers/cn'
import { forwardRef } from 'react'

export type PreProps = {} & React.HTMLAttributes<HTMLPreElement>

export const Pre = forwardRef<HTMLPreElement, PreProps>(({ className, children, ...props }, ref) => (
  <pre
    ref={ref}
    className={cn(
      css({
        borderRadius: '$4',
        fontSize: {
          base: '$3',
          md: '$4',
        },
        lineHeight: 1.8,
        mt: 0,
        mb: '$5',
        bg: '$slate5',
        color: '$slate10',
        px: '$3',
        py: '$2',
        '&> code': {
          fontSize: 'inherit',
          lineHeight: 'inherit',
        },
      }),
      className,
    )}
    {...props}
  >
    {children}
  </pre>
))
