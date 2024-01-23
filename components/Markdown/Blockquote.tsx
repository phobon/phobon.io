import styled from '@emotion/styled'
import { compose, space, gridColumn, SpaceProps, GridColumnProps } from 'styled-system'

import { spanAllColumns } from '@/data/constants'
import { shouldForwardProp } from '../Base/utils'

export const Blockquote = styled('blockquote', { shouldForwardProp })<SpaceProps & GridColumnProps>(
  (props) => ({
    position: 'relative',
    '&::before': {
      position: 'absolute',
      left: '-3rem',
      top: 0,
      bottom: 0,
      width: 4,
      backgroundColor: props.theme.colors.accent[8],
      content: "''",
    },
    '> *': {
      marginBottom: 0,
      fontStyle: 'italic',
      color: props.theme.colors.grayscale[3],
    },
  }),
  compose(space, gridColumn),
)

Blockquote.defaultProps = {
  mb: 6,
  gridColumn: spanAllColumns,
}
