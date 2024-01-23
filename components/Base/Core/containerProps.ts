import {
  compose,
  space,
  layout,
  border,
  color,
  position,
  background,
  SpaceProps,
  LayoutProps,
  BorderProps,
  ColorProps,
  PositionProps,
  BackgroundProps,
} from 'styled-system'

import {
  gridPosition,
  cover,
  fullWidth,
  fullHeight,
  round,
  GridPositionProps,
  CoverProps,
  FullWidthProps,
  FullHeightProps,
  RoundProps,
} from '../utils'

export const containerSystem = compose(
  space,
  layout,
  border,
  color,
  position,
  background,
  round,
  cover,
  fullWidth,
  fullHeight,
  gridPosition,
)

export type ContainerProps = SpaceProps &
  LayoutProps &
  BorderProps &
  ColorProps &
  PositionProps &
  BackgroundProps &
  GridPositionProps &
  CoverProps &
  FullWidthProps &
  FullHeightProps &
  RoundProps

export const containerStyles: any = {
  boxSizing: 'border-box',
  minWidth: 0,
}
