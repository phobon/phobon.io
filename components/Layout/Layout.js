import React from 'react';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ title, children }) => (
  <>
    <Header
      key="header"
      title={title}
      maxWidth={['none', 1400]}
      px={5} />

    {children}

    <Footer
      key="footer"
      px={5}
      maxWidth={1400} />
  </>
);

export default Layout;