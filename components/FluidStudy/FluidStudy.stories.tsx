import React from 'react'
import { Stack } from '@phobon/base'

import { FluidStudy } from './FluidStudy'

export default {
  component: FluidStudy,
  title: 'Components/FluidStudy',
}

const studies = [
  {
    key: 'building-a-better-buying-experience-at-agworld',
    title: 'Building a Better Buying Experience at Agworld',
    href: 'writing/building-a-better-buying-experience-at-agworld',
    src: 'https://source.unsplash.com/random/1280x600',
    published: '23 December 2019',
    category: 'Agworld',
    description: "Improving the experience of buying subscriptions for Agworld's customers",
    tags: ['Design', 'Research', 'Front-end Development'],
    heroPosition: 'left',
  },
  {
    key: 'aligning-agworlds-platform-experiences',
    title: "Aligning Agworld's Platform Experiences",
    href: 'writing/aligning-agworlds-platform-experiences',
    src: 'https://source.unsplash.com/random/1280x600',
    published: '17 August 2019',
    category: 'Agworld',
    description: "Helping to align Agworld's web product and its highly rated and widely adopted mobile apps",
    tags: ['Design', 'Front-end Development'],
    heroPosition: 'right',
  },
]

export const withVaryingTextLengths = () => (
  <Stack fullWidth alignItems='flex-start'>
    {studies.map(({ key, ...s }) => (
      <FluidStudy key={key} {...s} />
    ))}
  </Stack>
)
