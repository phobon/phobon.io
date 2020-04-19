import React from "react";
import { Box, Heading, Stack, Vector } from '@phobon/base';

import { useApi } from '../hooks';
import { SlideLink, Paragraph, Span, Projects, Study, FluidStudy } from '../components';

export default () => {
  const projects = useApi('/api/projects');
  const writing = useApi('/api/writing');
  return (
    <>
      <Stack
        fullWidth
        maxWidth={1280}
        alignSelf="center"
        px={[4, 6]}>
        <Heading.H1 fontSize={[9, 10]} lineHeight={[2, 3]} color="foreground">Hi there! I'm <SlideLink href="https://www.instagram.com/thenoumenon/">Ben</SlideLink>, a <Span color="violets.5">Developer</Span> & <Span color="accent.5">Designer</Span> based in Perth</Heading.H1>
        <Box fullWidth mt={[7, 9]} justifyContent="space-between" alignItems="flex-start" mb={[7, 10]}>
          <Vector color="grayscale.4" size={32} mt={2} display={['none', 'initial']}>
            <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
          </Vector>

          <Stack width={['100%', 3 / 5]} alignItems="flex-end">
            <Paragraph mb={5}>
              I've been <Span color="accent.4">designing</Span> & <Span color="violets.4">making</Span> interesting things my entire life. I've really found my passion building products that make a positive difference to the world
            </Paragraph>
            <Paragraph mb={5}>
              Currently, I'm working as a UX Engineer at <SlideLink href="https://agworld.com">Agworld</SlideLink>, helping drive & scale their design effort through making <SlideLink href="http://signal.agworld.com/">Design Systems</SlideLink>; designing thoughtful, accessible digital experiences; & mentoring others in design & front-end development
            </Paragraph>

            <Paragraph>
              You'll often find me enjoying time with my <SlideLink href="https://www.instagram.com/thestudiophysio/">amazing partner</SlideLink>, along with my <SlideLink href="https://www.instagram.com/kodi_lab/">best friend</SlideLink>
            </Paragraph>
          </Stack>
        </Box>
      </Stack>

      {writing && (
        <Stack fullWidth mb={[7, 10]} className="fluid" id="writing">
          {writing.map(({key, ...s}, i, array) => (
            <FluidStudy bg="grayscale.9" key={key} {...s} heroPosition={i % 2 === 0 ? 'left' : 'right'} mb={[i === array.length - 1 ? 0 : 5, 0]} />
          ))}
        </Stack>
      )}

      {projects && <Projects projects={projects} />}
    </>
  );
}