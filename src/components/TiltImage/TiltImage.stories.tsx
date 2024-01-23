import React from 'react'

import { TiltImage } from './TiltImage'

export default {
  component: TiltImage,
  title: 'Components/TiltImage',
}

export const withDefaultProps = () => (
  <TiltImage width={300} height={300} src='https://source.unsplash.com/random/300x300' />
)

export const withDifferentFactor = () => (
  <TiltImage width={300} height={300} factor={30} src='https://source.unsplash.com/random/300x300' />
)
