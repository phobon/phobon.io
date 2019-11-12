import React from 'react';
import { Stack, Text } from '@phobon/base';
import Link from 'next/link';

import SlideLink from './SlideLink';

const Study = ({ href, title, published, category, tags, ...props }) => (
  <Stack fullWidth alignItems="flex-start" {...props}>
    <Stack flexDirection="row" space={1}>
      <Text fontSize={[2, 3]} color="grayscale.1" lineHeight={1}>Case Study /</Text>
      <Text fontSize={[2, 3]} color="grayscale.3" lineHeight={1}>{`${category} /`}</Text>
      <Text fontSize={[2, 3]} color="grayscale.3" lineHeight={1}>{published}</Text>
    </Stack>
    <Link href={href} passHref>
      <SlideLink fontSize={[6, 8]} fontWeight="bold" lineHeight={2}>{title}</SlideLink>
    </Link>
  </Stack>
);

export default Study;