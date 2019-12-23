import React from 'react';
import styled from 'styled-components';
import { Box } from '@phobon/base';

const SlideContainer = styled(Box)`
  background: ${props => props.theme.colors.accent[6]};
  position: relative;

  &::before, &::after {
    content: '';
    width: 0;
    height: 0;
    border: 4px solid transparent;
    position: absolute;
    transition: transform 90ms ease-out;    
  }

  &::before {
    border-right-color: ${props => props.theme.colors.accent[6]};
    border-bottom-color: ${props => props.theme.colors.accent[6]};
    left: 0;
    top: -8px;
    transform: translateY(8px);
  }

  &::after {
    border-left-color: ${props => props.theme.colors.accent[6]};
    border-top-color: ${props => props.theme.colors.accent[6]};
    right: -8px;
    bottom: 0;
    transform: translateX(-8px);
  }

  > img {
    width: 100%;
    height: auto;
    position: relative;
    left: 0;
    top: 0;
    transition: transform 90ms ease-out;
    z-index: 1;
  }

  &:hover {
    &::before, &::after {
      transform: translate(0, 0);
    }

    > img {
      transform: translate(8px, -8px);
    }
  }
`;

const BoxImage = ({ src, ...props }) => (
  <SlideContainer {...props}>
    <img src={src} />
  </SlideContainer>
);

export default BoxImage;