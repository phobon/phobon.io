import React from 'react'
import { Stack } from '@phobon/base'

import { Project } from './Project'

export default {
  component: Project,
  title: 'Components/Project',
}

const projects = [
  {
    key: 1,
    name: 'Signal',
    status: 'Live',
    description: 'A design system built with styled-components & styled-system',
    image: 'https://source.unsplash.com/random/480x640',
    url: 'http://signal.agworld.com',
    tags: ['Product Design', 'Front-End Development', 'Accessibility', 'Identity'],
  },
  {
    key: 2,
    name: 'The Studio',
    status: 'Live',
    description: 'A physiotherapy and clinical pilates studio based in Perth',
    image: 'https://source.unsplash.com/random/480x640',
    url: 'https://thestudiophysio.com',
    tags: ['Founder', 'Identity', 'Photography'],
  },
]

export const withDefaultProps = () => (
  <Stack fullWidth space={9} alignItems='flex-start'>
    {projects.map(({ key, ...p }) => (
      <Project key={key} project={p} />
    ))}
  </Stack>
)
