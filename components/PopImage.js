import React from 'react';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box } from '@phobon/base';

const PopContainer = styled(Box)`
  background: ${props => props.theme.colors[props.color][6]};
  opacity: 0;
  transition: opacity 0.5s ease-out;
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

  > img {
    width: 100%;
    height: 100%;
    position: relative;
    object-fit: cover;
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

  &.loaded {
    opacity: 1;
  }
`;

const PopImage = ({ src, alt, extension, ...props }) => {
  const [loading, setLoading] = useState(true);
  const imgRef = useRef(null);

  useEffect(() => {
    imgRef.current.src = `${src}${extension}`;
    imgRef.current.onload = () => setLoading(false);
  }, [])

  return (
    <PopContainer className={loading ? '' : 'loaded'} {...props}>
      <img ref={imgRef} alt={alt} />
    </PopContainer>
  );
};

PopImage.propTypes = {
  color: PropTypes.string,
  extension: PropTypes.string,
};

PopImage.defaultProps = {
  color: 'accent',
  extension: '',
};

export default PopImage;