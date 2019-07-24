import React from 'react';
import { Flex } from '@phobon/base';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ pathname, children }) => (
  <React.Fragment>
    <Header pathname={pathname} px={[4, 6]} maxWidth={1280} />
    <Flex fullWidth py={[5, 10]} px={[4, 6]} flexDirection="column" alignItems="flex-start">
      {children}
    </Flex>
    <Footer px={[4, 6]} />
  </React.Fragment>
);

export default Layout;