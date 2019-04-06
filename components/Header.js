import React from 'react';
import styled from 'styled-components';
import { Box, Vector, BoxList, BoxListItem } from '@phobon/base';
import Link from 'next/link';

import SlideLink from './SlideLink';

const AccentVector = styled(Vector)`
  > .a {
    fill: ${props => props.theme.colors.accent[5]};
  }
`;

const nav = [
  { pathname: '/projects', label: 'Projects' },
  { pathname: '/about', label: 'About' },
  { pathname: '/thoughts/test', label: 'Thoughts' },
];

export default ({ pathname, ...props }) => {
  const navItems = nav.map(n => (
    <BoxListItem ml={3} key={n.pathname}>
      <Link href={n.pathname} passHref>
        <SlideLink className={n.pathname === pathname ? 'current' : ''}>{n.label}</SlideLink>
      </Link>
    </BoxListItem>
  ));

  return (
    <Box
      as="header"
      py={[4, 5]}
      bg="background"
      justifyContent="space-between"
      fullWidth
      {...props}
      css={{ position: 'sticky', top: 0, zIndex: 1 }}>
      <Link href="/">
        <Box width={[32, 40]} height={[32, 40]} >
          <AccentVector width="100%" height="100%" viewBox="0 0 16 16" color="grayscale.3">
            <path d="M15.5 16H10.5C10.2239 16 10 15.7761 10 15.5V13.5C10 13.2239 10.2239 13 10.5 13H12.5C12.7761 13 13 12.7761 13 12.5V10.5C13 10.2239 13.2239 10 13.5 10H15.5C15.7761 10 16 10.2239 16 10.5V15.5C16 15.7761 15.7761 16 15.5 16Z" />
            <path d="M2.5 13H0.5C0.223858 13 0 13.2239 0 13.5L0 15.5C0 15.7761 0.223858 16 0.5 16H2.5C2.77614 16 3 15.7761 3 15.5L3 13.5C3 13.2239 2.77614 13 2.5 13Z" />
            <path d="M2.5 3H0.5C0.223858 3 0 3.22386 0 3.5L0 9.5C0 9.77614 0.223858 10 0.5 10H9.5C9.77614 10 10 9.77614 10 9.5V7.5C10 7.22386 9.77614 7 9.5 7L3.5 7C3.22386 7 3 6.77614 3 6.5V3.5C3 3.22386 2.77614 3 2.5 3Z" />
            <path d="M10.5 0H15.5C15.7761 0 16 0.223858 16 0.5V2.5C16 2.77614 15.7761 3 15.5 3H10.5C10.2239 3 10 2.77614 10 2.5V0.5C10 0.223858 10.2239 0 10.5 0Z" className="a"/>
          </AccentVector>
        </Box>
      </Link>

      {/* <BoxList as="nav">
        {navItems}
      </BoxList> */}
    </Box>
  );
};