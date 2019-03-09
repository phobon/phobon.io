import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Flex, Box, useAccent } from '@phobon/base';
import { animated, useTransition, config } from 'react-spring'; 

import Header from './Header';
import Footer from './Footer';

const Animated = styled(animated.div)`
  position: absolute;
  left: ${props => props.theme.space[5]}px;
  right: ${props => props.theme.space[5]}px;
  top: ${props => props.theme.space[6]}px;
  bottom: ${props => props.theme.space[6]}px;
`;

const Layout = ({ pathname, children, config, ...props }) => {
  const [accent, setAccent] = useAccent();

  useEffect(() => {
    const accents = ['reds', 'blues', 'purples', 'greens', 'oranges'];
    setAccent(accents[Math.floor(Math.random() * accents.length)]);
  }, []);

  const transitions = useTransition(children, c => c.key, {
    from: { opacity: 0 },
    enter: item => async next => {
        await next({ opacity: 1 });
    },
    leave: item => async (next, cancel) => {
      await next({ opacity: 0 });
    },
    config: (item, state) =>
      state === 'leave' ? config : config,
  });

  const mappedTransitions = transitions.map(({ key, item, props: { ...style } }) => {
    return (item && (
      <Animated key={key} style={style}>
        {item}
      </Animated>
    ));
  });

  return (
    <Box
      fullWidth
      alignItems="flex-start"
      bg="background"
      flexDirection="column"
      css={{ minHeight: '100%' }}>
      <Header pathname={pathname} />
      <Flex fullWidth justifyContent="flex-start" alignItems="flex-start" flexDirection="column" overflow="none" position="relative">
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