/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { Grid } from '@phobon/base'

import { spanAllColumns } from '@/data/constants'

import { Figure } from './Figure'

export const FigureGrid = ({ children, caption, ...props }) => (
  <Figure caption={caption}>
    <Grid
      {...props}
      css={{
        '> picture': {
          width: '100%',
          justifySelf: 'center',
        },
      }}
      fullWidth
    >
      {children}
    </Grid>
  </Figure>
)

FigureGrid.defaultProps = {
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gridGap: 5,
  gridColumn: spanAllColumns,
}
