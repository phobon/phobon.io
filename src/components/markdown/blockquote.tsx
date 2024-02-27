import { css } from '@/design/css'
import { cn } from '@/helpers/cn'

export type BlockquoteProps = {
  className?: string
} & React.HTMLAttributes<HTMLQuoteElement>

export const blockquoteStyles = css({
  position: 'relative',
  gridColumn: '1 / -1',
  mb: '$5',
  _before: {
    position: 'absolute',
    left: '-3rem',
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '$purple8',
    content: "''",
  },
  '&> *': {
    marginBottom: 0,
    fontStyle: 'italic',
    color: '$slate9',
  },
})

export const Blockquote = ({ className, children, ...props }: BlockquoteProps) => {
  return (
    <blockquote className={cn(blockquoteStyles, className)} {...props}>
      {children}
    </blockquote>
  )
}
