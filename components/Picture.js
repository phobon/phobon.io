import React from 'react';
import { Image } from '@phobon/base';

const Picture = ({ src, type, ...props }) => (
  <picture>
    <source srcSet={src} type="image/webp" />
    <source srcSet={src} type={type} />
    <Image src={src} {...props} />
  </picture>
);

export default Picture;