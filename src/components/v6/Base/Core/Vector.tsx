import React from 'react'
import styled from '@emotion/styled'
import { compose } from 'styled-system'
import { shouldForwardProp } from '../utils'

import { imageStyles, imageSystem, ImageProps } from './imageProps'

import { paint, PaintProps } from '../utils'

const vectorSystem = compose(imageSystem, paint)

export type VectorProps = ImageProps & PaintProps

export const StyledVector = styled('svg', { shouldForwardProp })<VectorProps>(imageStyles, vectorSystem)

export const Vector = ({ ...props }) => <StyledVector xmlns='http://www.w3.org/2000/svg' {...props} />

Vector.displayName = 'Vector'

Vector.defaultProps = {
  fill: 'foreground',
  stroke: 'none',
}
