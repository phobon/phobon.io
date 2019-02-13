import React from 'react';
import styled from 'styled-components';
import { Grid } from 'base';

const LayoutContainer = styled(Grid)`
`;

export default ({ children, ...props }) => (
  <LayoutContainer
    fullHeight
    fullWidth
    gridTemplateRows="auto 1fr auto"
    gridTemplateColumns="1fr"
    alignItems="flex-start">
    {children}
  </LayoutContainer>
);