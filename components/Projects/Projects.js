import React from 'react';
import { Grid } from '@phobon/base';
import Project from './Project';

const Projects = ({ projects, ...props }) => (
  <Grid fullWidth gridTemplateColumns="repeat(auto-fit, minmax(300px, 500px))" gridAutoRows="auto" gridGap={[6, 7]} {...props}>
    {projects.map(p => (
      <Project key={p.name} project={p} alignSelf="flex-start" />
    ))}
  </Grid>
);

export default Projects;