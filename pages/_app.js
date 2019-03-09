import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { theme } from '@phobon/base';

import { Layout } from '../components';

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render () {
    const { router, Component, pageProps } = this.props

    return (
      <Container>
        <Head>
          <title>phbn</title>
        </Head>
        <ThemeProvider theme={theme}>
          <Layout pathname={router.pathname}>
            <Component {...pageProps} key={router.pathname} />
          </Layout>
        </ThemeProvider>
      </Container>
    );
  }
}