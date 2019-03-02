import React, { useEffect } from 'react';
import { Grid, Flex, Box, useAccent } from 'base';
import { animated, useTransition, config } from 'react-spring'; 

import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, config, ...props }) => {
  const [accent, setAccent] = useAccent();

  useEffect(() => {
    const accents = ['reds', 'blues', 'purples', 'greens', 'oranges'];
    setAccent(accents[Math.floor(Math.random() * accents.length)]);
  }, []);

  const transitions = useTransition(children, c => c.key, {
    from: { position: 'absolute', opacity: 0 },
    enter: item => async next => {
        await next({ opacity: 1 });
        await next({ position: 'unset' });
    },
    leave: item => async (next, cancel) => {
      await next({ opacity: 0 });
    },
    config: (item, state) =>
      state === 'leave' ? config : config,
  });

  const mappedTransitions = transitions.map(({ key, item, props: { ...style } }) => {
    return (item && (
      <animated.div key={key} style={style}>
        {item}
      </animated.div>
    ));
  });

  return (
    <Box
      fullWidth
      alignItems="flex-start"
      bg="background"
      flexDirection="column"
      css={{ minHeight: '100%' }}>
      <Header />
      <Flex fullWidth px={5} py={6} justifyContent="flex-start" alignItems="flex-start" flexDirection="column" overflow="none">
        {mappedTransitions}
      </Flex>
      <Footer />
    </Box>
  );
};

Layout.defaultProps = {
  config: { tension: 125, friction: 20, precision: 0.1 },
};

export default Layout;