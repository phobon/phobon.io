import React from 'react';
import { Grid, Box } from '@phobon/base';
import Project from './Project';

import Apps from 'rmdi/lib/Apps';

const Projects = ({ projects, ...props }) => (
  <Box fullWidth justifyContent="space-between" alignItems="flex-start">
    <Apps color="grayscale.4" />
    <Grid flex="1" gridTemplateColumns="1fr" gridAutoRows="auto" gridGap={8} pl={9}>
      {projects.map(p => (
        <Project key={p.name} project={p} />
      ))}
    </Grid>
  </Box>
);

export default Projects;