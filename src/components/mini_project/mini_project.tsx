import { css } from '@/design/css'
import { cn } from '@/utils/cn'
import { anchorStyles } from '../primitives/anchor'
import { ArrowRightIcon } from '@radix-ui/react-icons'

export type MiniProjectProps = {
  index: string
  href: string
  title: string
  client: string
  as?: any
} & React.HTMLAttributes<HTMLDivElement>

export const MiniProject = ({ index, href, title, children, client, as: Tag = 'div', ...props }: MiniProjectProps) => {
  return (
    <Tag
      className={css({
        display: 'grid',
        gridTemplateColumns: 'subgrid',
        gridColumn: '1 / -1',
      })}
      {...props}
    >
      <a
        href={href}
        target='_blank'
        title={title}
        className={cn(
          anchorStyles,
          css({
            gridColumn: '1 / -1',
            display: 'grid !important',
            gridTemplateColumns: 'subgrid',
            gridTemplateRows: {
              base: 'auto auto',
              md: 'auto',
            },
            py: '$5 !important',
            color: '$slate10',
          }),
        )}
      >
        <span
          className={css({
            gridColumn: {
              base: '1 / span 2',
            },
            display: {
              base: 'none',
              md: 'flex',
            },
            color: '$slate8',
            gap: '$2',
          })}
        >
          <span>{index}</span>
          <span
            className={css({
              color: '$slate10',
            })}
          >
            {client}
          </span>
        </span>

        <span
          className={css({
            gridColumn: {
              base: '1 / -2',
              md: '3 / span 2',
              lg: '4 / 6',
            },
            gridRow: {
              base: '1 / span 1',
            },
          })}
        >
          {title}
        </span>
        <span
          className={css({
            gridColumn: {
              base: '1 / -2',
              md: '5 / -2',
              lg: '7 / -2',
            },
            gridRow: {
              base: '2 / span 1',
              md: '1 / span 1',
            },
            color: '$slate9',
          })}
        >
          {children}
        </span>
        <span
          className={css({
            gridColumn: {
              base: '-2 / -1',
            },
            alignSelf: {
              base: 'center',
              md: 'start',
            },
            gridRow: {
              base: '1 / span 2',
              md: '1 / span 1',
            },
            justifySelf: 'end',
          })}
        >
          <ArrowRightIcon width={20} height={20} />
        </span>
      </a>
    </Tag>
  )
}
