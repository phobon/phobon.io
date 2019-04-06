import React from 'react';
import { Box, Text, Link, BoxList, Grid, BoxListItem } from '@phobon/base';
import Tag from '../Tag';
import SlideLink from '../SlideLink';

const Project = ({ project, ...props }) => {
  const { name, description, status, image, url, tags } = project;
  return (
    <Box {...props} fullWidth flexDirection="column" alignItems="flex-start" fontSize={8}>
      <Tag
      lineHeight={2}
      fontSize={2}
      mb={2}
      css={{ opacity: 0.8 }}
      bg={status === 'Live' ? 'greens.7' : 'oranges.7'}
      color={status === 'Live' ? 'greens.0' : 'oranges.0'}>{`${status} Project`}</Tag>
      
      <SlideLink fontSize={8} fontWeight="bold" lineHeight={2} href={url}>{name}</SlideLink>
      <Text fontSize={5} color="grayscale.2" mb={3}>{description}</Text>       

      <BoxList>
        {tags.map(t => (
          <BoxListItem key={t} mr={3}>
            <Text fontSize={2} color="grayscale.3">{t}</Text>
          </BoxListItem>
        ))}
      </BoxList>

    </Box>
  );
};

export default Project;