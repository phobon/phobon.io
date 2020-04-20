import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { theme } from '@phobon/base';
import { MDXProvider } from '@mdx-js/react';

import { Layout, markdown } from '../components';

export default class PhobonApp extends App {
  render () {
    const { Component, pageProps, router } = this.props
    return (
      <>
        <Head>
          <title>phbn</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="title" content="phbn" />
          <meta name="description" content="Personal website for developer and product designer, Ben McCormick" />
          <link rel="icon" href="/static/favicon.svg" type="image/svg+xml" />
          <link rel="icon" href="/static/favicon.ico" />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://phobon.io" />
          <meta property="og:title" content="phbn" />
          <meta property="og:description" content="Personal website for developer and product designer, Ben McCormick" />
          <meta property="og:image" content="https://phobon.io/static/phbn.webp" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://phobon.io" />
          <meta property="twitter:title" content="phbn" />
          <meta property="twitter:description" content="Personal website for developer and product designer, Ben McCormick" />
          <meta property="twitter:image" content="https://phobon.io/static/phbn.webp" />
        </Head>
        <ThemeProvider theme={theme}>
          <MDXProvider components={markdown}>
            <Layout pathname={router.pathname}>
              <Component {...pageProps} key={router.route} />
            </Layout>
          </MDXProvider>
        </ThemeProvider>
      </>
    )
  }
}