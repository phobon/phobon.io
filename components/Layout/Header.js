import React, { useCallback } from 'react';
import { Box, Stack, useTheme } from '@phobon/base';

import { Toggle } from '@phobon/grimoire';
import Link from 'next/link';

import { getTheme } from '../../hooks';

import Identity from '../Identity';
import SlideLink from '../SlideLink';

const nav = [
  { pathname: '/#writing', label: 'Writing' },
  { pathname: '/#contact', label: 'Contact' },
];

const Header = ({ pathname, title, ...props }) => {
  const [theme, setTheme] = useTheme('light', getTheme);
  const toggleTheme = useCallback(() => setTheme(theme === 'light' ? 'dark' : 'light'), [theme]);
  
  const navItems = nav.map(n => (
    <Link href={n.pathname} passHref key={n.pathname}>
      <SlideLink fontSize={[3, 5]} current={n.pathname === pathname}>{n.label}</SlideLink>
    </Link>
  ));

  return (
    <Box
      as="header"
      py={[4, 5]}
      bg="background"
      fullWidth
      opacity={0.9}
      justifyContent="space-between"
      {...props}
      css={{ position: 'sticky', top: 0, zIndex: 2 }}>
      <Link href="/">
        <Identity />
      </Link>

      <Stack as="nav" flexDirection="row" space={5}>
        {navItems}
        <Toggle toggled={theme === 'dark'} onClick={toggleTheme} aria-label="Toggle Theme" />
      </Stack>
    </Box>
  );
};

export default Header;