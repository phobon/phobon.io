import React from 'react';
import styled from 'styled-components';
import { Image, cover } from '@phobon/base';

const StyledPicture = styled.picture(cover);

const Picture = ({ src, fallbackType, ...props }) => {
  const fallback = `${src}.${fallbackType}`;
  return (
    <StyledPicture {...props}>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <source srcSet={fallback} type={`image/${fallbackType}`} />
      <Image src={fallback} {...props} />
    </StyledPicture>
  );
};

export default Picture;