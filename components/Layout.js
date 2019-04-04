import React from 'react';
import { Flex, Box, Scrollable } from '@phobon/base';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ pathname, children, ...props }) => (
  <Box
    alignItems="flex-start"
    bg="background"
    minHeight="100%">
    <Flex flexDirection="column" fullHeight maxWidth={1280}>
      <Header pathname={pathname} px={6} />
      <Flex fullWidth py={8} px={6} flexDirection="column" alignItems="flex-start">
        {children}
      </Flex>
      <Footer px={6} />
    </Flex>
  </Box>
);

export default Layout;