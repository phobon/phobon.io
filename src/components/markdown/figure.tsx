import { css } from '@/design/css'
import { cn } from '@/helpers/cn'
import { forwardRef } from 'react'

export type FigureProps = {
  caption?: string
} & React.HTMLAttributes<HTMLDivElement>

export const figureStyles = css({
  display: 'flex',
  flex: 'none',
  flexDirection: 'column',
  width: '100%',
  position: 'relative',
  gridColumn: '1 / -1',
  justifyContent: 'center',
  alignItems: 'center',
  mb: '$5',
})

export const Figure = forwardRef<HTMLDivElement, FigureProps>(({ caption, className, children, ...props }, ref) => (
  <figure className={cn(figureStyles, className)} ref={ref} {...props}>
    {children}
    <figcaption
      className={css({
        mt: '$2',
        color: '$slate10',
        fontSize: '$2',
        alignSelf: 'flex-start',
      })}
    >
      {caption}
    </figcaption>
  </figure>
))
