import React from 'react';
import { Grid } from '@phobon/base';

import Figure from './Figure';

const FigureGrid = ({ children, caption, ...props }) => (
  <Figure caption={caption}>
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
  </Figure>
);

FigureGrid.defaultProps = {
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gridGap: 5,
};

export default FigureGrid;