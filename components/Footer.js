import React from 'react';
import { Box, BoxList, BoxListItem, Link } from 'base';
import { links } from '../static/data.json';

export default () => {
  const linkSet = links.map(l => (
    <BoxListItem mr={2} key={l.label}>
      <Link href={l.url}>{l.label}</Link>
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