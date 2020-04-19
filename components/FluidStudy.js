import React from 'react';
import { Grid, Stack, Text, Link as SignalLink } from '@phobon/base';
import Link from 'next/link';

import PopImage from './PopImage';
import SlideLink from './SlideLink';

const FluidStudy = ({
  href,
  src,
  title,
  published,
  description,
  category,
  tags,
  heroPosition,
  ...props
}) => (
  <Grid
    fullWidth
    {...props}
    height={['auto', 800]}
    gridTemplateColumns={['1fr', 'repeat(2, 1fr)']}>
    <Link href={href} passHref>
      <SignalLink
        fullWidth
        height={[500, '100%']}
        gridArea={heroPosition === 'left' ? ['', '1 / 1 / span 1 / span 1'] : ['', '1 / 2 / span 1 / span 1']}>
        <PopImage fullWidth src={src} alt={title} fullHeight />
      </SignalLink>
    </Link>

    <Stack
      fullWidth
      alignItems="flex-start"
      px={[4, 8]}
      py={[4, 9]}
      gridArea={heroPosition === 'right' ? ['', '1 / 1 / span 1 / span 1'] : ['', '1 / 2 / span 1 / span 1']}>
      <Text fontSize={[3, 4]} color="grayscale.4">{published}</Text>
      <Text fontSize={[6, 7]} color="grayscale.0" lineHeight={1} mb={3}>{title}</Text>
      <Text fontSize={[4, 5]} color="grayscale.4" mb={3}>{description}</Text>
      <Link href={href} passHref>
        <SlideLink fontSize={[4, 5]} fontWeight="bold">Check it out</SlideLink>
      </Link>
    </Stack>
  </Grid>
);

FluidStudy.defaultProps = {
  heroPosition: 'left',
};

export default FluidStudy;