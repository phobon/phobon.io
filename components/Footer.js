import React from 'react';
import { Box, BoxList, BoxListItem } from '@phobon/base';
import SlideLink from './SlideLink';
import { links } from '../pages/data.json';

const Footer = props => {
  const linkSet = links.map(l => (
    <BoxListItem mr={2} key={l.label}>
      <SlideLink href={l.url}>{l.label}</SlideLink>
    </BoxListItem>
  ));

  return (
    <Box as="footer" fullWidth py={5} {...props}>
      <BoxList flexWrap="wrap" fullWidth justifyContent="flex-start">
        {linkSet}
      </BoxList>
    </Box>
  );
};

export default Footer;