import React from 'react';
import { Grid, Box } from '@phobon/base';
import Project from './Project';

import Apps from 'rmdi/lib/Apps';

const Projects = ({ projects, ...props }) => (
  <Box fullWidth justifyContent="space-between" alignItems="flex-start" {...props}>
    <Box display={['none', 'flex']}>
      <Apps color="grayscale.4"  />
    </Box>
    <Grid flex="1" gridTemplateColumns="1fr" gridAutoRows="auto" gridGap={[6, 7]} pl={[0, 9]}>
      {projects.map(p => (
        <Project key={p.name} project={p} />
      ))}
    </Grid>
  </Box>
);

export default Projects;