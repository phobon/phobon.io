import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Box, Vector, useTheme, useAccent } from 'base';

import Toggle from './Toggle';

const AccentVector = styled(Vector)`
  > .a {
    fill: ${props => props.theme.colors.accent[5]};
  }
`;

export default () => {
  // const [isToggled, setIsToggled] = useState(false);
  // const [theme, setTheme] = useTheme();

  // useEffect(() => {
  //   setTheme(isToggled ? 'dark' : 'light');
  // }, [isToggled]);

  return (
    <Box as="header" px={5} pt={5} justifyContent="space-between">
      <AccentVector width={32} height={32} viewBox="0 0 16 16" color="grayscale.3">
        <path d="M15.5 16H10.5C10.2239 16 10 15.7761 10 15.5V13.5C10 13.2239 10.2239 13 10.5 13H12.5C12.7761 13 13 12.7761 13 12.5V10.5C13 10.2239 13.2239 10 13.5 10H15.5C15.7761 10 16 10.2239 16 10.5V15.5C16 15.7761 15.7761 16 15.5 16Z" />
        <path d="M2.5 13H0.5C0.223858 13 0 13.2239 0 13.5L0 15.5C0 15.7761 0.223858 16 0.5 16H2.5C2.77614 16 3 15.7761 3 15.5L3 13.5C3 13.2239 2.77614 13 2.5 13Z" />
        <path d="M2.5 3H0.5C0.223858 3 0 3.22386 0 3.5L0 9.5C0 9.77614 0.223858 10 0.5 10H9.5C9.77614 10 10 9.77614 10 9.5V7.5C10 7.22386 9.77614 7 9.5 7L3.5 7C3.22386 7 3 6.77614 3 6.5V3.5C3 3.22386 2.77614 3 2.5 3Z" />
        <path d="M10.5 0H15.5C15.7761 0 16 0.223858 16 0.5V2.5C16 2.77614 15.7761 3 15.5 3H10.5C10.2239 3 10 2.77614 10 2.5V0.5C10 0.223858 10.2239 0 10.5 0Z" className="a"/>
      </AccentVector>

      <Box as="nav">

      </Box>

      {/* <Toggle isToggled={isToggled} onClick={() => setIsToggled(!isToggled)} toggledBg={["reds.3", "reds.2"]} /> */}
    </Box>
  );
};