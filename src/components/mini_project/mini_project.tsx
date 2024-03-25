import { css } from '@/design/css'
import Text from '@/components/canvas/webgl_text'
import { cn } from '@/helpers/cn'
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
      <Text
        as='a'
        href={href}
        target='_blank'
        title={title}
        className={css({
          gridColumn: '1 / -1',
          display: 'grid',
          gridTemplateColumns: 'subgrid',
        })}
        textStyles={cn(
          anchorStyles,
          css({
            gridColumn: '1 / -1',
            display: 'grid !important',
            gridTemplateColumns: 'subgrid',
            py: '$5 !important',
            color: '$slate10',
          }),
        )}
      >
        <span
          className={css({
            gridColumn: {
              base: 'span 1',
            },
            color: '$slate8',
          })}
        >
          {index}
        </span>

        <span
          className={css({
            gridColumn: {
              base: 'span 2',
              md: 'span 2',
              lg: 'span 2',
            },
          })}
        >
          {title}
        </span>
        <span
          className={css({
            gridColumn: {
              base: 'span 3',
              md: 'span 5',
              lg: 'span 7',
            },
            color: '$slate9',
          })}
        >
          {children}
        </span>
        <span
          className={css({
            gridColumn: {
              base: 'span 1',
            },
            textAlign: 'right',
            color: '$slate9',
          })}
        >
          {client}
        </span>
        <span
          className={css({
            gridColumn: {},
            alignSelf: 'start',
            justifySelf: 'end',
          })}
        >
          <ArrowRightIcon width={20} height={20} />
        </span>
      </Text>
    </Tag>
  )
}
