import React from 'react';
import { Box, Text } from '@phobon/base';

import SlideLink from '../SlideLink';
import PopImage from '../PopImage';

const Project = ({ project, ...props }) => {
  const { name, description, image, fallbackType, fallbackExtension, url } = project;
  return (
    <Box
      {...props}
      fullWidth
      flexDirection="column"
      alignItems="flex-start"
      fontSize={[6, 8]}>
      <SlideLink fontSize={[6, 8]} fontWeight="bold" lineHeight={2} mb={[2, 0]} href={url}>{name}</SlideLink>
      <Text fontSize={[4, 5]} color="grayscale.2" mb={4}>{description}</Text>
      {/* When this becomes a link to an internal project, it needs a Link */}
      <a css={{ width: '100%' }} href={url}>
        <PopImage responsive src={image} fallbackType={fallbackType} fallbackExtension={fallbackExtension} alt={name} />
      </a>
    </Box>
  );
};

export default Project;