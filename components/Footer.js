import React from 'react';
import { Box, BoxList, BoxListItem } from '@phobon/base';
import SlideLink from './SlideLink';

const links = [
  { label: "Dribbble", url: "https://dribbble.com/thenoumenon" },
  { label: "Github", url: "https://github.com/phobon" },
  { label: "Instagram", url: "http://instagram.com/thenoumenon" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/ben-mccormick-a373304/" },
  { label: "Twitter", url: "https://twitter.com/thenoumenon" }
];

const Footer = props => {
  const linkSet = links.map(l => (
    <BoxListItem key={l.label} mr={5} mb={3}>
      <SlideLink href={l.url}>{l.label}</SlideLink>
    </BoxListItem>
  ));

  return (
    <Box
      as="footer"
      fullWidth
      alignItems="flex-start"
      justifyContent="flex-start">
      <BoxList
        flexDirection={['column', 'row']}
        justifyContent="flex-start"
        alignItems="flex-start"
        pt={5}
        pb={3}
        fontSize={[3, 5]}
        gridGap={[3, 6]}
        {...props}>
        {linkSet}
      </BoxList>
    </Box>
  );
};

export default Footer;