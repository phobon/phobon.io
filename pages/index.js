import React from "react";
import { Box, Heading, Stack, Vector, Grid } from '@phobon/base';

import { useApi } from '../hooks';
import { SlideLink, Paragraph, Span, FluidStudy, Project } from '../components';

export default () => {
  const projects = useApi('/api/projects');
  const writing = useApi('/api/writing');
  return (
    <>
      <Stack
        fullWidth
        maxWidth={1280}
        alignSelf="center"
        px={[4, 6]}
        as="section">
        <Heading.H1 fontSize={[9, 10]} lineHeight={[2, 3]} color="foreground">I'm <SlideLink href="https://www.instagram.com/thenoumenon/">Ben</SlideLink>, a <Span color="violets.5">Developer</Span> & <Span color="accent.5">Designer</Span> based out of Perth</Heading.H1>
        <Box fullWidth mt={[7, 9]} justifyContent="space-between" alignItems="flex-start" mb={[7, 10]}>
          <Vector fill="grayscale.4" size={32} mt={2} display={['none', 'initial']}>
            <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
          </Vector>

          <Paragraph width={['100%', 3 / 5]} mb={0} color="grayscale.3">
            I've been <Span color="accent.4">designing</Span> & <Span color="violets.4">making</Span> interesting things my entire life. I've really found my passion building products that make a <Span>positive difference to the world</Span>
          </Paragraph>
        </Box>
      </Stack>

      {writing && (
        <Stack fullWidth mb={[7, 10]} className="fluid" id="writing" as="section">
          {writing.map(({key, ...s}, i, array) => (
            <FluidStudy bg="grayscale.9" key={key} {...s} heroPosition={i % 2 === 0 ? 'left' : 'right'} mb={[i === array.length - 1 ? 0 : 5, 0]} />
          ))}
        </Stack>
      )}

      <Stack
        fullWidth
        maxWidth={1280}
        alignSelf="center"
        px={[4, 6]}
        mb={[7, 10]}
        alignItems="flex-start"
        space={6}
        as="section">
        <Stack alignItems="flex-start">
          <Heading.H3 color="grayscale.4">
            Current
          </Heading.H3>
          <Paragraph mb={0}>
            UX Engineer at <SlideLink href="https://agworld.com">Agworld</SlideLink> <Span color="grayscale.3">since 2018</Span>
          </Paragraph>
          <Paragraph mb={0} color="grayscale.3">
            Driving & scaling design through making <SlideLink href="http://signal.agworld.com/">Design Systems</SlideLink>; designing thoughtful, accessible digital experiences; & mentoring others in <Span color="violets.5">design</Span> & <Span color="accent.5">front-end development</Span>
          </Paragraph>
        </Stack>
        

        <Stack alignItems="flex-start">
          <Heading.H3 color="grayscale.4">
            Previous
          </Heading.H3>
          <Paragraph mb={0}>
            Full Stack Engineer and Designer at <SlideLink href="https://acquire.com.au">Acquire</SlideLink> <Span color="grayscale.3">2005-2017</Span>
          </Paragraph>
        </Stack>
      </Stack>
      

      {projects && (
        <Grid
          maxWidth={1280}
          fullWidth
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 500px))"
          gridAutoRows="auto"
          gridGap={8}
          alignSelf="center"
          px={[4, 6]}
          as="section">
          {projects.map(p => (
            <Project key={p.name} project={p} alignSelf="flex-start" />
          ))}
        </Grid>
      )}
    </>
  );
}