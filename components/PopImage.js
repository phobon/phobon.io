import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box } from '@phobon/base';

const Picture = styled(Box)`
  background: ${props => props.theme.colors[props.color][6]};
  transition: opacity 0.5s ease-out;
  position: relative;
  display: flex;

  &::before, &::after {
    content: '';
    width: 0;
    height: 0;
    border: 4px solid transparent;
    position: absolute;
    transition: transform 90ms ease-out;
  }

  &::before {
    border-right-color: ${props => props.theme.colors[props.color][6]};
    border-bottom-color: ${props => props.theme.colors[props.color][6]};
    left: 0;
    top: -8px;
    transform: translateY(8px);
  }

  &::after {
    border-left-color: ${props => props.theme.colors[props.color][6]};
    border-top-color: ${props => props.theme.colors[props.color][6]};
    right: -8px;
    bottom: 0;
    transform: translateX(-8px);
  }

  img {
    width: 100%;
    height: 100%;
    position: relative;
    object-fit: cover;
    transition: transform 90ms ease-out;
    z-index: 1;
  }

  &:hover {
    &::before, &::after {
      transform: translate(0, 0);
    }

    img {
      transform: translate(8px, -8px);
    }
  }
`;

const PopImage = ({ src, alt, fallbackExtension, fallbackType, ...props }) => {
  const fallback = `${src}.${fallbackExtension}`;
  return (
    <Picture as="picture" {...props}>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <source srcSet={fallback} type={`image/${fallbackType}`} />
      <img src={fallback} alt={alt} />
    </Picture>
  );
};

PopImage.propTypes = {
  color: PropTypes.string,
  fallbackExtension: PropTypes.string,
  fallbackType: PropTypes.string,
};

PopImage.defaultProps = {
  color: 'accent',
  fallbackType: 'jpeg',
  fallbackExtension: 'jpg',
};

export default PopImage;