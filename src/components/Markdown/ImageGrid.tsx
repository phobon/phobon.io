/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { Grid } from '@/components/Base/Core'

import { spanAllColumns } from '@/data/constants'

export const ImageGrid = ({ children, ...props }) => (
  <Grid
    {...props}
    css={{
      '> img': {
        justifySelf: 'center',
      },
    }}
    fullWidth
  >
    {children}
  </Grid>
)

ImageGrid.defaultProps = {
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gridGap: 5,
  gridColumn: spanAllColumns,
}
