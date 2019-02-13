import React from 'react';
import { Box, BoxList, BoxListItem, Link } from 'base';

export default () => (
  <Box as="footer" fullWidth px={6} pb={6}>
    <BoxList flexWrap="wrap" fullWidth justifyContent="flex-start">
      <BoxListItem mr={2}>
        <Link href="https://dribbble.com/thenoumenon">Dribbble</Link>
      </BoxListItem>
      <BoxListItem mr={2}>
        <Link href="https://github.com/phobon">Github</Link>
      </BoxListItem>
      <BoxListItem mr={2}>
        <Link href="http://instagram.com/thenoumenon">Instagram</Link>
      </BoxListItem>
      <BoxListItem mr={2}>
        <Link href="https://www.linkedin.com/in/ben-mccormick-a373304/">LinkedIn</Link>
      </BoxListItem>
      <BoxListItem>
        <Link href="https://twitter.com/thenoumenon">Twitter</Link>
      </BoxListItem>
    </BoxList>
  </Box>
);