import React from 'react';
import { Stack, Text, Box } from '@phobon/base';
import Link from 'next/link';

import BoxImage from './BoxImage';
import SlideLink from './SlideLink';

const Study = ({ href, title, published, description, category, tags, ...props }) => (
  <Stack fullWidth alignItems="flex-start" {...props}>
    <Link href={href} passHref>
      <a css={{ width: '100%' }}>
        <BoxImage fullWidth src={`static/${href}/index.png`} alt={title} mb={4} />
      </a>
    </Link>

    <Box fullWidth justifyContent="space-between" alignItems="flex-start" flexDirection={['column', 'row']}>
      <Stack alignItems="flex-start" space={3} width={['100%', 2 / 5]} mb={[4, 0]}>
        <Text fontSize={[6, 7]} color="grayscale.1" lineHeight={1}>{title}</Text>
        <Text fontSize={[3, 4]} color="grayscale.3">{published}</Text>
      </Stack>
      <Stack width={['100%', 1 / 2]} space={3} alignItems={['flex-start', 'flex-end']}>
        <Text fontSize={[4, 5]}>{description}</Text>
        <Link href={href} passHref>
          <SlideLink fontSize={[5, 6]} fontWeight="bold">Check it out</SlideLink>
        </Link>
      </Stack>
    </Box>
    
  </Stack>
);

export default Study;