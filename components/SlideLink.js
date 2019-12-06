import React from 'react';
import styled from 'styled-components';
import { compose, color, space, fontSize, lineHeight } from 'styled-system';

const slideLinkProps = compose(color, space, fontSize, lineHeight);

const SlideAnchor = styled.a`
  ${slideLinkProps}
  overflow: hidden;
  z-index: 1;
  line-height: inherit;

  &:visited, &:focus {
    text-decoration: none;
  }
`;

const SlideSpan = styled.span`
  line-height: inherit;
  font-size: inherit;
  text-decoration: none;
  background-image: ${props => `linear-gradient(${props.theme.colors.accent[7]}, ${props.theme.colors.accent[7]})`};
  background-position: 0% 95%;
  background-repeat: no-repeat;
  background-size: ${props => props.current ? '100%' : '0%'} 22%;
  transition: background-size 90ms cubic-bezier(0.19, 1, 0.22, 1);

  &:hover, &:focus {
    background-size: 100% 22%;
  }
`;

const SlideSpanInner = styled.span`
  background-image: ${props => `linear-gradient(${props.theme.colors.grayscale[7]}, ${props.theme.colors.grayscale[7]})`};
  background-position: 0% 95%;
  background-repeat: no-repeat;
  background-size: 100% 22%;
`;

const SlideLink = React.forwardRef(({ children, href, title, rel, current, ...props }, ref) => (
  <SlideAnchor href={href} title={title} rel={rel} {...props}>
    <SlideSpanInner>
      <SlideSpan current={current}>
        {children}
      </SlideSpan>
    </SlideSpanInner>
  </SlideAnchor>
));

SlideLink.defaultProps = {
  color: 'foreground',
};

export default SlideLink;