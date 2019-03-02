import React from 'react';
import styled from 'styled-components';
import { space } from 'styled-system';
import { Text } from 'base';

const SlideLinkContainer = styled.span`
  ${space}
  position: relative;
  overflow: hidden;
  z-index: 0;
  display: inline-block;
  line-height: inherit;
  vertical-align: inherit;

  &::before, &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 67%;
    height: 22%;
    width: 100%;
    transition: transform 90ms cubic-bezier(0.19, 1, 0.22, 1);
    pointer-events: none;
    z-index: -1;
  }

  &::after {
    transform: translateX(-100%);
    background-color: ${props => props.theme.colors.accent[5]};
  }

  &::before {
    background-color: ${props => props.theme.colors.grayscale[6]};
  }

  &:hover {
    &::after {
      transform: translateX(0);
    }
  }

  &.current {
    pointer-events: none;

    &::before {
      display: none;
    }

    &::after {
      transform: translateX(0);
      background-color: ${props => props.theme.colors.accent[6]};
      top: 30%;
      height: 60%;
    }
  }
`;

const SlideAnchor = styled(Text).attrs(props => ({ as: 'a' }))`
  overflow: hidden;
  z-index: 1;
  line-height: inherit;

  &:visited, &:focus {
    text-decoration: none;
  }

  &:focus {
    outline: 0;

    &::after {
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      content: "";
      box-shadow: 0 0 0 2px ${props => props.theme.colors.guidance.focus};
      border-radius: ${props => props.theme.radii[2]}px;
      pointer-events: none;
    }
  }
`;

const SlideLink = ({ children, href, title, rel, ...props}) => (
  <SlideLinkContainer {...props}>
    <SlideAnchor fontSize="inherit" href={href} title={title} rel={rel}>
      {children}
    </SlideAnchor>
  </SlideLinkContainer>
);

export default SlideLink;