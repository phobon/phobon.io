import React from 'react'
import { Vector, VectorProps } from '@/components/v6/Base/Core'

export const HamburgerGlyph: React.FunctionComponent<VectorProps> = ({
  width = 16,
  height = 16,
  fill = 'grayscale.0',
  ...props
}) => (
  <Vector width={width} height={height} viewBox='0 0 16 16' fill={fill} {...props}>
    <rect y='11' width='16' height='2' rx='1' />
    <rect y='3' width='16' height='2' rx='1' />
  </Vector>
)

HamburgerGlyph.displayName = 'HamburgerGlyph'
