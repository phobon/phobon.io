import React from 'react';
import { Flex } from '@phobon/base';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ pathname, children }) => (
  <Flex flexDirection="column" maxWidth={1280}>
    <Header pathname={pathname} px={[4, 6]} />
    <Flex fullWidth py={[5, 10]} px={[4, 6]} flexDirection="column" alignItems="flex-start">
      {children}
    </Flex>
    <Footer px={[4, 6]} />
  </Flex>
);

export default Layout;