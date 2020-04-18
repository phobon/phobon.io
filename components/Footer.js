import React from 'react';
import { Box, Stack } from '@phobon/base';
import SlideLink from './SlideLink';

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
    <Box
      as="footer"
      fullWidth
      alignItems="flex-start"
      justifyContent="flex-start">
      <Stack
        as="ul"
        flexDirection={['column', 'row']}
        justifyContent="flex-start"
        alignItems="flex-start"
        pt={5}
        pb={3}
        gridGap={[3, 6]}
        {...props}>
        {linkSet}
      </Stack>
    </Box>
  );
};

export default Footer;