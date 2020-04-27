import React from 'react';
import { Stack,  Box, Text } from '@phobon/base';

import SlideLink from '../SlideLink';
import PopImage from '../PopImage';

const Project = ({ project, ...props }) => {
  const { name, description, image, fallbackType, fallbackExtension, url } = project;
  return (
    <Stack
      as="article"
      {...props}
      fullWidth
      flexDirection="row"
      alignItems="flex-start"
      space={6}>
      {/* When this becomes a link to an internal project, it needs a Link */}
      <a href={url} css={{ width: 200 }}>
        <PopImage src={image} fallbackType={fallbackType} fallbackExtension={fallbackExtension} alt={name} />
      </a>
      <Stack flex={1} alignItems="flex-start">
        <SlideLink fontSize={[5, 6]} fontWeight="bold" lineHeight={2} mb={[2, 0]} href={url}>{name}</SlideLink>
        <Text fontSize={[4, 5]} color="grayscale.3" mb={4}>{description}</Text>
      </Stack>
    </Stack>
  );
};

export default Project;