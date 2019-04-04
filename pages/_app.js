import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { theme } from '@phobon/base';

import { Layout } from '../components';

theme.colors.accent = [...theme.colors.oranges];
theme.colors.grayscale = [
  'hsl(228, 29%, 90%)',
  'hsl(229, 25%, 86%)',
  'hsl(230, 20%, 77%)',
  'hsl(228, 16%, 64%)',
  'hsl(227, 13%, 48%)',
  'hsl(225, 17%, 35%)',
  'hsl(221, 20%, 28%)',
  'hsl(215, 22%, 26%)',
];
theme.colors.foreground = 'hsl(228, 62%, 95%)';
theme.colors.background = 'hsl(221, 20%, 22%)';

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