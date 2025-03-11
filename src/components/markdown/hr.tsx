import { css } from '@/design/css'
import { cn } from '@/utils/cn'

export type HRProps = {} & React.HTMLAttributes<HTMLHRElement>

export const hrStyles = css({
  borderWidth: 1,
  borderStyle: 'solid',
  width: '5%',
  borderColor: '$purple4',
  my: '$5',
  gridColumn: '1 / -1',
})

export const Hr = ({ className, ...props }: HRProps) => <hr className={cn(hrStyles, className)} {...props} />
