import React from 'react'

import { ShiftImage } from './ShiftImage'

export default {
  component: ShiftImage,
  title: 'Components/ShiftImage',
}

export const withDefaultProps = () => (
  <ShiftImage width={300} height={300} src='https://source.unsplash.com/random/300x300' />
)

export const withDifferentFactor = () => (
  <ShiftImage width={300} height={300} factor={30} src='https://source.unsplash.com/random/300x300' />
)
