import React from 'react';
import styled from 'styled-components';
import { space, flexbox } from 'styled-system';
import { Text } from '@phobon/base';

const StyledFigure = styled.figure({
  display: 'flex',
  flex: 'none',
  flexDirection: 'column',
  width: '100%',
},
  space,
  flexbox,
);

const Figure = ({ caption, children, ...props }) => (
  <StyledFigure {...props}>
    {children}
    <Text
      mt={2}
      as="figcaption"
      fontSize={2}
      color="grayscale.2"
      textStyle="italic"
      textAlign="center">
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