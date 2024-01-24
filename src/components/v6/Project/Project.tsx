/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react'
import { Stack, Box, Text } from '@/components/v6/Base/Core'

import { ShiftImage } from '../ShiftImage'
import Link from 'next/link'
import { SlideLink } from '@/components/slide_link'

export const Project = ({ project, ...props }) => {
  const { name, description, image, url } = project
  return (
    <Link href={url}>
      <Box {...props} fullWidth flexDirection={['column', 'row']} alignItems={'flex-start'}>
        {/* When this becomes a link to an internal project, it needs a Link */}

        <ShiftImage src={image} alt={name} loading='lazy' width={200} />
        <Stack flex={1} alignItems={['flex-start']} ml={[0, 5]} mt={[3, 0]} space={2}>
          <Text as='h3' fontSize={[4, 5]}>
            {name}
          </Text>
          <Text fontSize={[4, 5]} color='grayscale.3' textAlign={['left']}>
            {description}
          </Text>
        </Stack>
      </Box>
    </Link>
  )
}
