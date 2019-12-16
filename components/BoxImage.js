import React from 'react';
import styled from 'styled-components';
import { Box } from '@phobon/base';

const SlideContainer = styled(Box)`
  background: ${props => props.theme.colors.accent[6]};
  position: relative;

  > img {
    width: 100%;
    height: auto;
    position: relative;
    left: 0;
    top: 0;
    transition: transform 90ms ease-out;
  }

  &:hover {
    > img {
      transform: translate(4px, -4px);
    }
  }
`;

const BoxImage = ({ src, ...props }) => (
  <SlideContainer {...props}>
    <img src={src} />
  </SlideContainer>
);

export default BoxImage;