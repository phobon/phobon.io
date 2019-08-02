import React from 'react';
import { Grid } from '@phobon/base';

import Figure from './Figure';

const FigureGrid = ({ children, caption, ...props }) => (
  <Figure caption={caption}>
    <Grid {...props}>
      {children}
    </Grid>
  </Figure>
);

FigureGrid.defaultProps = {
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: 5,
};

export default FigureGrid;