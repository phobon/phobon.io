import React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from '@phobon/base';
import { MDXProvider } from '@mdx-js/react';
import { AnimatePresence } from 'framer-motion';

import { Layout, markdown } from '../components';

export default class PhobonApp extends App {
  render () {
    const { Component, pageProps, router } = this.props
    return (
      <ThemeProvider theme={theme}>
        <MDXProvider components={markdown}>
          <Layout>
            <AnimatePresence exitBeforeEnter>
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </Layout>
        </MDXProvider>
      </ThemeProvider>
    );
  }
}