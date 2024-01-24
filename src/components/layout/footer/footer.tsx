/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react'
import { Box, Stack, Grid, StackProps } from '@/components/v6/Base/Core'

import { socialLinks } from '@/data/links'
import { SlideLink } from '@/components/slide_link'
import { cn } from '@/helpers/cn'
import { css } from '@/design/css'

export const Footer: React.FunctionComponent<StackProps & React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => (
  <Stack
    as='footer'
    id='contact'
    fullWidth
    alignItems='flex-start'
    justifyContent='flex-start'
    pt={[0, 6]}
    pb={3}
    space={5}
    className={cn(css({}), 'phbn__footer')}
    {...props}
  >
    <Grid
      as='ul'
      gridTemplateColumns={['1fr', `repeat(${socialLinks.length}, 1fr)`]}
      gridTemplateRows={[`repeat(${socialLinks.length}, auto)`, 'auto']}
      gridGap={[2, 5]}
      css={{
        placeItems: 'start',
      }}
    >
      {socialLinks.map(({ id, label, href }) => (
        <Box as='li' key={id} mr={5} mb={3}>
          <SlideLink href={href} fontSize={[3, 5]}>
            {label}
          </SlideLink>
        </Box>
      ))}
    </Grid>
  </Stack>
)