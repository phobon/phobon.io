import React from 'react';
import { Grid } from '@phobon/base';
import Project from './Project';

const Projects = ({ projects, ...props }) => (
  <Grid
    maxWidth={1280}
    fullWidth
    gridTemplateColumns="repeat(auto-fit, minmax(300px, 500px))"
    gridAutoRows="auto"
    gridGap={8}
    px={[4, 6]}
    {...props}>
    {projects.map(p => (
      <Project key={p.name} project={p} alignSelf="flex-start" />
    ))}
  </Grid>
);

export default Projects;