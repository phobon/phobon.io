import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { compose, color, space, fontSize, lineHeight } from 'styled-system';

const slideLinkProps = compose(color, space, fontSize, lineHeight);

const SlideAnchor = styled('a')({
  overflow: 'hidden',
  zIndex: 1,
  lineHeight: 'inherit',

  '&:visited, &:focus': {
    textDecoration: 'none',
  }
},
slideLinkProps);

const SlideSpan = styled('span')(
  props => ({
    lineHeight: 'inherit',
    fontSize: 'inherit',
    textDecoration: 'inherit',
    backgroundImage: `linear-gradient(${props.theme.colors[props.slideColor][7]}, ${props.theme.colors[props.slideColor][7]})`,
    backgroundPosition: '0% 95%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${props.current ? '100%' : '0%'} 22%`,
    transition: 'background-size 90ms cubic-bezier(0.19, 1, 0.22, 1)',
    '&:hover, &:focus': {
      backgroundSize: '100% 22%',
    },
  }));

const SlideSpanInner = styled('span')(
  props => ({
    backgroundImage:`linear-gradient(${props.theme.colors.grayscale[7]}, ${props.theme.colors.grayscale[7]})`,
    backgroundPosition: '0% 95%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 22%',
  }),
);

const SlideLink = React.forwardRef(({ children, href, title, rel, current, slideColor, ...props }, ref) => (
  <SlideAnchor href={href} title={title} rel={rel} {...props}>
    <SlideSpanInner>
      <SlideSpan slideColor={slideColor} current={current}>
        {children}
      </SlideSpan>
    </SlideSpanInner>
  </SlideAnchor>
));

SlideLink.propTypes = {
  slideColor: PropTypes.string,
};

SlideLink.defaultProps = {
  color: 'foreground',
  slideColor: 'accent',
};

export default SlideLink;