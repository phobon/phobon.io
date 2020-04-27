import React from "react";
import { Heading, Stack, Grid } from '@phobon/base';
import { Spacer } from '@phobon/grimoire';

import { useApi } from '../hooks';
import { SlideLink, Span, FluidStudy, Project, Experience } from '../components';

export default () => {
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
        color="foreground">
        Hi, I'm <SlideLink href="https://www.instagram.com/thenoumenon/">Ben</SlideLink>. I'm a <Span color="violets.5">developer</Span> & <Span color="accent.5">designer</Span> based out of Perth.
      </Heading.H1>

      {writing && (
        <Grid
          id="writing"
          fullWidth
          as="section"
          alignItems="flex-start"
          gridTemplateColumns={['1fr', '2fr auto 1fr']}>
          {writing.map(({key, ...s}, i, array) => (
            <>
              <FluidStudy bg="grayscale.9" key={key} {...s} heroPosition={i % 2 === 0 ? 'left' : 'right'} mb={[i === array.length - 1 ? 0 : 5, 0]} />
              <Spacer direction="vertical" mx={5} length="100%" display={['none', 'block']} />
            </>
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
          space={9}
          as="section">
          {experiences.map(({ key, ...e }) => (
            <>
              <Experience {...e} />
              <Spacer length="100%" />
            </>
          ))}
        </Stack>
      )}

      {projects && (
        <Grid
          maxWidth={1280}
          fullWidth
          gridTemplateColumns="repeat(2, 1fr)"
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