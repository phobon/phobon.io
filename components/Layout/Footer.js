import React from 'react';
import { Box, Stack } from '@phobon/base';

import SlideLink from '../SlideLink';
import { Paragraph, Span } from '../Markdown';

const links = [
  { label: "Dribbble", url: "https://dribbble.com/phobon" },
  { label: "Github", url: "https://github.com/phobon" },
  { label: "Instagram", url: "http://instagram.com/thenoumenon" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/ben-mccormick-a373304/" },
  { label: "Twitter", url: "https://twitter.com/thenoumenon" }
];

const Footer = props => {
  const linkSet = links.map(l => (
    <Box as="li" key={l.label} mr={5} mb={3}>
      <SlideLink href={l.url} fontSize={[3, 5]}>{l.label}</SlideLink>
    </Box>
  ));

  return (
    <Stack
      as="footer"
      id="contact"
      fullWidth
      alignItems="flex-start"
      justifyContent="flex-start"
      bg="grayscale.9"
      pt={6}
      pb={3}
      space={5}
      {...props}>

      <Paragraph color="grayscale.3" mb={0}>
        You'll often find me enjoying time with my <SlideLink href="https://www.instagram.com/thestudiophysio/">amazing partner</SlideLink>, and my <SlideLink href="https://www.instagram.com/kodi_lab/">best friend</SlideLink>; or <Span color="inherit" css={{ textDecoration: 'line-through' }}>shitposting</Span> online
      </Paragraph>
  
      <Stack
        as="ul"
        flexDirection={['column', 'row']}
        justifyContent="flex-start"
        alignItems="flex-start"
        gridGap={[3, 6]}>
        {linkSet}
      </Stack>
    </Stack>
  );
};

export default Footer;