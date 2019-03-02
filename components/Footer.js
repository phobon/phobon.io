import React from 'react';
import { Box, BoxList, BoxListItem } from 'base';
import SlideLink from './SlideLink';
import { links } from '../pages/data.json';

export default () => {
  const linkSet = links.map(l => (
    <BoxListItem mr={2} key={l.label}>
      <SlideLink href={l.url}>{l.label}</SlideLink>
    </BoxListItem>
  ));

  return (
    <Box as="footer" fullWidth px={5} pb={5}>
      <BoxList flexWrap="wrap" fullWidth justifyContent="flex-start">
        {linkSet}
      </BoxList>
    </Box>
  );
};