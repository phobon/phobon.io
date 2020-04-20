import React from 'react';
import { Grid } from '@phobon/base';

const ImageGrid = ({ children, ...props }) => (
  <Grid
    {...props}
    css={`
      > img {
        justify-self: center;
      }
    `}
    fullWidth>
    {children}
  </Grid>
);

ImageGrid.defaultProps = {
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gridGap: 5,
};

export default ImageGrid;