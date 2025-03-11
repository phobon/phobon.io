import { css } from '@/design/css'
import { cn } from '@/utils/cn'

export type ImageGridProps = {} & React.HTMLAttributes<HTMLDivElement>

export const ImageGrid = ({ className, children, ...props }: ImageGridProps) => (
  <div
    {...props}
    className={cn(
      css({
        width: '100%',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gridGap: '$5',
        gridColumn: '1 / -1',
        '&> img': {
          justifySelf: 'center',
        },
      }),
      className,
    )}
  >
    {children}
  </div>
)
