import React from 'react';
import { Box, Text, BoxList, BoxListItem } from '@phobon/base';
import Tag from '../Tag';
import SlideLink from '../SlideLink';

const Project = ({ project, ...props }) => {
  const { name, description, status, image, url, tags } = project;
  return (
    <Box {...props} fullWidth flexDirection="column" alignItems="flex-start" fontSize={[6, 8]}>
      <Tag
        lineHeight={2}
        fontSize={[1, 2]}
        mb={[0, 2]}
        bg={status === 'Live' ? 'greens.7' : 'oranges.7'}
        color={status === 'Live' ? 'greens.0' : 'oranges.0'}>{`${status} Project`}</Tag>
      
      <SlideLink fontSize={[6, 8]} fontWeight="bold" lineHeight={2} mb={[2, 0]} href={url}>{name}</SlideLink>
      <Text fontSize={[4, 5]} color="grayscale.2" mb={3}>{description}</Text>       

      <BoxList flexDirection="row" flexWrap="wrap" justifyContent="flex-start" fullWidth>
        {tags.map(t => (
          <BoxListItem key={t} mr={3}>
            <Text fontSize={[2, 3]} color="grayscale.2">{t}</Text>
          </BoxListItem>
        ))}
      </BoxList>
    </Box>
  );
};

export default Project;