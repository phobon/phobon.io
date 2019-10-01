import React from 'react';
import { Flex } from '@phobon/base';
import { AnimatePresence, motion } from 'framer-motion';

import Header from './Header';
import Footer from './Footer';

const MotionFlex = motion.custom(Flex);

const Layout = ({ pathname, title, children }) => (
  <React.Fragment>
    <Header key="header" pathname={pathname} title={title} px={[4, 6]} />
    <AnimatePresence>
      <MotionFlex
        key="main" 
        as="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        fullWidth
        maxWidth={1280}
        py={[5, 10]}
        px={[4, 6]}
        flexDirection="column"
        alignItems="flex-start">
        {children}
      </MotionFlex>
    </AnimatePresence>
    <Footer key="footer" px={[4, 6]} />
  </React.Fragment>
);

export default Layout;