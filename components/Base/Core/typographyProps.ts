import {
  compose,
  space,
  color,
  layout,
  typography,
  position,
  textStyle,
  SpaceProps,
  ColorProps,
  LayoutProps,
  TypographyProps as StyledTypographyProps,
  PositionProps,
  TextStyleProps,
} from 'styled-system'

import {
  cover,
  fullWidth,
  fullHeight,
  gridPosition,
  CoverProps,
  FullWidthProps,
  FullHeightProps,
  GridPositionProps,
} from '../utils'

export const typographySystem = compose(
  space,
  color,
  layout,
  typography,
  position,
  textStyle,
  gridPosition,
  cover,
  fullWidth,
  fullHeight,
)

export type TypographyProps = SpaceProps &
  ColorProps &
  LayoutProps &
  StyledTypographyProps &
  PositionProps &
  TextStyleProps &
  CoverProps &
  FullWidthProps &
  FullHeightProps &
  GridPositionProps

export const typographyStyles: any = {
  boxSizing: 'border-box',
  display: 'block',
}
