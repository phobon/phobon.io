import { css } from '@/design/css'
import { cn } from '@/helpers/cn'

export type UlProps = {} & React.HTMLAttributes<HTMLUListElement>

export const Ul = ({ className, children, ...props }: UlProps) => (
  <ul
    className={cn(
      css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: '$2',
        mb: '$5',
        gridColumn: '1 / -1',
      }),
      className,
    )}
    {...props}
  >
    {children}
  </ul>
)

export type LiProps = {} & React.HTMLAttributes<HTMLLIElement>

export const Li = ({ className, children, ...props }: LiProps) => (
  <li
    {...props}
    className={cn(
      css({
        position: 'relative',
        pl: {
          base: '$4',
          md: '$6',
        },
        _before: {
          position: 'absolute',
          left: 0,
          top: '$2',
          content: "''",
          width: '1.2rem',
          height: '1.2rem',
          backgroundColor: 'hsl(216, 10%, 90%)',
          borderRadius: 4,
        },
      }),
      className,
    )}
  >
    <span
      className={css({
        fontSize: {
          base: '$4',
          md: '$5',
        },
        lineHeight: 1.8,
        maxWidth: '80ch',
        color: '$slate10',
      })}
    >
      {children}
    </span>
  </li>
)
