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
        <style jsx global>{`
          /* latin-ext */
          @font-face {
            font-family: 'Karla';
            font-style: normal;
            font-weight: 400;
            font-display: fallback;
            src: local('Karla'), local('Karla-Regular'), url(https://fonts.gstatic.com/s/karla/v7/qkBbXvYC6trAT7RbLtyU5rZPoAU.woff2) format('woff2');
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
          }
          /* latin */
          @font-face {
            font-family: 'Karla';
            font-style: normal;
            font-weight: 400;
            font-display: fallback;
            src: local('Karla'), local('Karla-Regular'), url(https://fonts.gstatic.com/s/karla/v7/qkBbXvYC6trAT7RVLtyU5rZP.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          /* cyrillic */
          @font-face {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-display: fallback;
            src: local('Rubik'), local('Rubik-Regular'), url(https://fonts.gstatic.com/s/rubik/v8/iJWKBXyIfDnIV7nFrXyw023e1Ik.woff2) format('woff2');
            unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
          }
          /* hebrew */
          @font-face {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-display: fallback;
            src: local('Rubik'), local('Rubik-Regular'), url(https://fonts.gstatic.com/s/rubik/v8/iJWKBXyIfDnIV7nDrXyw023e1Ik.woff2) format('woff2');
            unicode-range: U+0590-05FF, U+20AA, U+25CC, U+FB1D-FB4F;
          }
          /* latin-ext */
          @font-face {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-display: fallback;
            src: local('Rubik'), local('Rubik-Regular'), url(https://fonts.gstatic.com/s/rubik/v8/iJWKBXyIfDnIV7nPrXyw023e1Ik.woff2) format('woff2');
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
          }
          /* latin */
          @font-face {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-display: fallback;
            src: local('Rubik'), local('Rubik-Regular'), url(https://fonts.gstatic.com/s/rubik/v8/iJWKBXyIfDnIV7nBrXyw023e.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }          

          :root, body {
            width: 100vw;
            min-height: 100vh;
        
            margin: 0;
            padding: 0;
        
            font-size: 8px;
            overflow-x: hidden;
          }
        
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 1.43;
        
            // Specific layout resets.
            display: flex;
            flex: none;
            flex-direction: column;
          }
        
          *, ::before, ::after {
            box-sizing: border-box;
          }
        
          a,
          a:hover,
          a:visited {
            text-decoration: none;
          }
        
          ul {
            margin: 0;
            padding: 0;
            list-style-type: none;
          }
        
          code,
          kbd {
            font-family: "SF Mono", "Segoe UI Mono", "Roboto Mono", "Ubuntu Mono", Menlo, Courier, monospace;
          }
        
          template {
            display: none;
          }
        
          article,
          aside,
          details,
          figcaption,
          figure,
          footer,
          header,
          hgroup,
          main,
          menu,
          nav,
          section {
            display: block;
          }
        
          html,
          body,
          p,
          div,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          ul,
          ol,
          dl,
          img,
          pre,
          form,
          fieldset {
            margin: 0;
            padding: 0;
          }
        
          img,
          fieldset {
            border: 0;
          }

          #__next {
            width: 100vw;
            height: 100vh;
          }
        
          body {
            font-family: 'Karla', sans-serif;
          }
        
          h1, h2, h3, h4, h5, h6 {
            font-family: 'Rubik', sans-serif;
          }
        `}</style>
        <ThemeProvider theme={theme}>
          <Layout pathname={router.pathname}>
            <Component {...pageProps} key={router.pathname} />
          </Layout>
        </ThemeProvider>
      </Container>
    );
  }
}