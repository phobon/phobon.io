import React from 'react';
import { Grid, Heading, Stack, Text } from '@phobon/base';

import SlideLink from '../SlideLink';

const Experience = ({ employ, href, title, timeframe, description, achievements, colour, ...props }) => (
  <Grid
    as="article"
    gridTemplateColumns={['1fr', '1fr 2fr']}
    gridGap={[4, 0]}
    gridTemplateRows="auto"
    alignItems="flex-start"
    {...props}>
    <Stack justifyContent={['flex-start', 'center']} alignItems={['center', 'flex-start']} flexDirection={['row', 'column']} fullWidth space={[0, 2]}>
      <Heading.H3 mr={[2, 0]}>
        <SlideLink href={href}>{employ}</SlideLink>
      </Heading.H3>
      <Text fontSize={5} color="grayscale.4">{timeframe}</Text>
    </Stack>

    <Stack fullWidth alignItems="flex-start" space={4}>
      <Heading.H3 color="foreground">
        {title}
      </Heading.H3>
      <Text as="p" fontSize={[4, 5]} color="grayscale.3" mt={2}>
        {description}
      </Text>

      {achievements && (
        <Grid as="ul" gridTemplateColumns={['1fr', 'repeat(2, 1fr)']} fullWidth gridAutoRows="auto" alignItems="flex-start" gridGap={4}>
          {achievements.map(({ key, title, description, href }) => (
            <Stack as="li" key={key} alignItems="flex-start">
              <SlideLink href={href} fontSize={[4, 5]}>
                {title}
              </SlideLink>
              <Text fontSize={[4, 5]} color="grayscale.4">{description}</Text>
            </Stack>
          ))}
        </Grid>
      )}
    </Stack>
  </Grid>
);

Experience.defaultProps = {
  colour: 'accent.5',
};

export default Experience;