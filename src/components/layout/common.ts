import { css } from '@/design/css'

export const gridStyles = css({
  display: 'grid',
  gridColumnGap: '$5',
  gridTemplateColumns: {
    base: 'repeat(6, 1fr)',
    md: 'repeat(8, 1fr)',
    lg: 'repeat(12, 1fr)',
  },
})
