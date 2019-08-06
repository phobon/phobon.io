import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { theme } from '@phobon/base';
import { MDXProvider } from '@mdx-js/react';

import { Layout, markdown } from '../components';

theme.colors.accent = [...theme.colors.oranges];

export default class PhobonApp extends App {
  render () {
    const { Component, pageProps, router } = this.props
    return (
      <Container>
        <Head>
          <title>phbn</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="Description" content="Personal website for developer and product designer, Ben McCormick." />
          <link rel="icon" href="/static/favicon.ico" />
        </Head>
        <ThemeProvider theme={theme}>
          <Layout pathname={router.pathname}>
            <MDXProvider components={markdown}>
              <Component {...pageProps} key={router.pathname} />
            </MDXProvider>
          </Layout>
        </ThemeProvider>
      </Container>
    )
  }
}