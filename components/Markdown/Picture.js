import React from 'react';
import { Box } from '@phobon/base';

const Picture = ({ src, fallbackExtension, fallbackType, alt, loading, ...props }) => {
  const fallback = `${src}.${fallbackExtension}`;
  return (
    <Box as="picture" {...props}>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <source srcSet={fallback} type={`image/${fallbackType}`} />
      <img src={fallback} alt={alt} {...props} loading={loading} />
    </Box>
  );
};

Picture.defaultProps = {
  fallbackExtension: 'jpg',
  fallbackType: 'jpeg',
  loading: 'lazy',
};

export default Picture;