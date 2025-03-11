import { css } from '@/design/css'
import { Figure } from './figure'
import { cn } from '@/utils/cn'

export type FigureGridProps = {
  caption?: string
} & React.HTMLAttributes<HTMLDivElement>

export const FigureGrid = ({ className, children, caption, ...props }: FigureGridProps) => (
  <Figure caption={caption}>
    <div
      {...props}
      className={cn(
        css({
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gridGap: '$5',
          gridColumn: '1 / -1',
          '&> picture': {
            width: '100%',
            justifySelf: 'center',
          },
        }),
        className,
      )}
    >
      {children}
    </div>
  </Figure>
)
