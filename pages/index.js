import React from "react";
import { Heading, Stack, Grid } from '@phobon/base';
import { Spacer } from '@phobon/grimoire';

import { useApi } from '../hooks';
import { SlideLink, Span, FluidStudy, Project, Experience } from '../components';

const Index = ({ ...props }) => {
  const projects = useApi('/api/projects');
  const writing = useApi('/api/writing');
  const experiences = useApi('/api/experiences');

  return (
    <>
      <Heading.H1
        fullWidth
        fontSize={[9, 10]}
        lineHeight={[2, 3]}
        maxWidth={1280}
        mb={[5, 0]}
        color="foreground">
        Hi, I'm <SlideLink href="https://www.instagram.com/thenoumenon/">Ben</SlideLink>. I'm a <Span color="violets.5">developer</Span> & <Span color="accent.5">designer</Span> based in Perth
      </Heading.H1>

      {writing && (
        <Grid
          id="writing"
          fullWidth
          as="section"
          alignItems="flex-start"
          gridGap={[7, 0]}
          gridTemplateColumns={['1fr', '2fr auto 1fr']}>
          {writing.map(({key, ...s}) => (
            <React.Fragment key={key}>
              <FluidStudy {...s} />
              <Spacer direction="vertical" mx={5} length="100%" display={['none', 'block']} />
            </React.Fragment>
          ))}
        </Grid>
      )}

      <Spacer length="100%" />

      {experiences && (
        <Stack
          fullWidth
          maxWidth={1280}
          alignSelf="center"
          alignItems="flex-start"
          space={[6, 9]}
          as="section">
          {experiences.map(({ key, ...e }) => (
            <React.Fragment key={key}>
              <Experience {...e} />
              <Spacer length="100%" />
            </React.Fragment>
          ))}
        </Stack>
      )}

      {projects && (
        <Grid
          maxWidth={1280}
          fullWidth
          gridTemplateColumns={['1fr', 'repeat(2, 1fr)']}
          gridAutoRows="auto"
          alignSelf="center"
          gridGap={6}
          as="section">
          {projects.map(p => (
            <Project key={p.name} project={p} alignSelf="flex-start" />
          ))}
        </Grid>
      )}

      <Spacer length="100%" />
    </>
  );
}

export default Index;