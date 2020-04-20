import React from 'react';
import { Flex } from '@phobon/base';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ pathname, title, children }) => (
  <>
    <Header key="header" pathname={pathname} title={title} px={[4, 6]} />
    <Flex
      as="main"
      fullWidth
      py={[5, 10]}
      flexDirection="column"
      alignItems="flex-start">
      {children}
    </Flex>
    <Footer key="footer" px={[4, 6]} />
  </>
);

export default Layout;