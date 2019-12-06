import React from 'react';
import styled from 'styled-components';
import { space, flexbox } from 'styled-system';
import { Text, gridPosition } from '@phobon/base';

const StyledFigure = styled.figure({
  display: 'flex',
  flex: 'none',
  flexDirection: 'column',
  width: '100%',
},
  space,
  flexbox,
  gridPosition,
);

const Figure = ({ caption, children, bg, ...props }) => (
  <StyledFigure {...props}>
    {children}
    <Text
      mt={2}
      as="figcaption"
      fontSize={2}
      color="grayscale.3"
      css={{ alignSelf: 'flex-start' }}>
      {caption}
    </Text>
  </StyledFigure>
);

Figure.defaultProps = {
  mb: 5,
  justifyContent: 'center',
  alignItems: 'center',
};

export default Figure;