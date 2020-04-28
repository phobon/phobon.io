import React from 'react';
import { Stack } from '@phobon/base';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ pathname, title, children }) => (
  <>
    <Header
      key="header"
      pathname={pathname}
      title={title}
      maxWidth={['none', 1280]}
      px={[5, 0]} />
    
    <Stack
      flex={1}
      as="main"
      fullWidth
      maxWidth={1280}
      px={[5, 0]}
      py={[6, 9]}
      space={[6, 9]}>
      {children}
    </Stack>

    <Footer
      key="footer"
      px={[5, 0]}
      maxWidth={1280} />
  </>
);

export default Layout;