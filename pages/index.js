import React from "react";
import { Box, Heading } from '@phobon/base';

import { useApi } from '../hooks';
import { SlideLink, Paragraph, Span, Projects } from '../components';

import ArrowDownward from 'rmdi/lib/ArrowDownward';

export default () => {
  const projects = useApi('/api/projects');
  return (
    <React.Fragment>
      <Heading.H1 fontSize={[8, 10]} lineHeight={[2, 3]} color="foreground">Hi there! I'm <SlideLink href="https://www.instagram.com/thenoumenon/">Ben</SlideLink>, a <Span color="greens.5">Developer</Span> & <Span color="accent.5">Product Designer</Span> based in Perth</Heading.H1>
      <Box fullWidth mt={[7, 9]} justifyContent="space-between" alignItems="flex-start" mb={[7, 10]}>
        <ArrowDownward color="grayscale.4" size={32} mt={2} display={['none', 'initial']} />

        <Box flexDirection="column" width={['100%', 3 / 5]} alignItems="flex-end">
          <Paragraph mb={5}>
            I've been <Span color="accent.5">designing</Span> & <Span color="greens.5">making</Span> interesting things my entire life, & have really found my passion building products that make a positive difference to the world
          </Paragraph>
          <Paragraph mb={5}>
            Currently, I'm working as a UX Engineer at <SlideLink href="https://agworld.com">Agworld</SlideLink>, helping drive & scale their design effort through making <SlideLink href="http://signal.agworld.com/">Design Systems</SlideLink>; designing thoughtful, accessible digital experiences; & mentoring others in design & front-end development
          </Paragraph>

          <Paragraph>
            You'll often find me enjoying time with my <SlideLink href="https://www.instagram.com/thestudiophysio/">amazing partner</SlideLink>, along with my <SlideLink href="https://www.instagram.com/kodi_lab/">best friend</SlideLink>
          </Paragraph>
        </Box>
      </Box>

      {projects && <Projects projects={projects} />}
    </React.Fragment>
  );
}