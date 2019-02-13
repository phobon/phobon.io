import React from 'react'
import App, { Container } from 'next/app'
import { ThemeProvider } from 'styled-components';
import { theme, Box } from 'base';
import { animated, useTransition, config } from 'react-spring'; 

import { Header, Footer, Layout } from '../components';

const Animated = ({ Component, pageProps }) => {
  const timeout = 3000;
  const config = { tension: 125, friction: 20, precision: 0.1 };

  const transitions = useTransition(<Component {...pageProps} />, null, {
    from: { opacity: 0 },
    enter: item => async next =>
        await next({ opacity: 1 }),
    leave: item => async (next, cancel) => {
      await next({ opacity: 0 });
    },
    config: (item, state) =>
      state === 'leave' ? [{ duration: timeout }, config] : config,
  });

  return (
    transitions.map(({ key, item, props: { ...style } }) => {
      return (
        <animated.div key={key} style={style}>
          {item}
        </animated.div>
      );
    })
  );
};

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Layout>
            <Header gridArea="1 / 1 / span 1 / span 1" />
            <Box fullWidth p={6} justifyContent="flex-start" alignItems="flex-start" flexDirection="column" gridArea="2 / 1 / span 1 / span 1" >
              <Component {...pageProps} />
            </Box>
            <Footer gridArea="3 / 1 / span 1 / span 1" />
          </Layout>
        </ThemeProvider>
      </Container>
    )
  }
}