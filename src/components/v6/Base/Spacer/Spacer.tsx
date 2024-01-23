import styled from '@emotion/styled'
import {
  compose,
  color,
  space,
  minWidth,
  minHeight,
  display,
  ColorProps,
  SpaceProps,
  MinWidthProps,
  MinHeightProps,
  DisplayProps,
} from 'styled-system'

import { shouldForwardProp, gridPosition, GridPositionProps } from '../utils'

const spacerSystem = compose(color, space, minWidth, minHeight, display, gridPosition)

export interface ISpacerProps {
  direction?: 'horizontal' | 'vertical'
  length?: string | number
  thickness?: string | number
}

export type SpacerProps = ISpacerProps &
  ColorProps &
  SpaceProps &
  MinWidthProps &
  MinHeightProps &
  DisplayProps &
  GridPositionProps &
  React.HTMLAttributes<HTMLSpanElement>

export const Spacer = styled('span', {
  shouldForwardProp,
})<SpacerProps>(
  (props) => ({
    width: props.direction === 'horizontal' ? props.length : props.thickness,
    height: props.direction === 'vertical' ? props.length : props.thickness,
  }),
  spacerSystem,
)

Spacer.defaultProps = {
  direction: 'horizontal',
  bg: 'grayscale.8',
  thickness: '2px',
  length: '80%',
  display: 'block',
  minWidth: 0,
}
