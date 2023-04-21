import React from 'react'
import { Vector, VectorProps } from '@phobon/base'

export const CloseGlyph: React.FunctionComponent<VectorProps> = ({
  width = 16,
  height = 16,
  fill = 'grayscale.0',
  ...props
}) => (
  <Vector width={width} height={height} viewBox='0 0 16 16' fill={fill} {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M13.7669 12.2506C14.1574 12.6411 14.1574 13.2743 13.7669 13.6648L13.6648 13.7669C13.2743 14.1574 12.6411 14.1574 12.2506 13.7669L8.04105 9.55731L3.83147 13.7669C3.44095 14.1574 2.80778 14.1574 2.41726 13.7669L2.31521 13.6648C1.92469 13.2743 1.92469 12.6411 2.31521 12.2506L6.52479 8.04105L2.29289 3.80915C1.90237 3.41863 1.90237 2.78546 2.29289 2.39494L2.39494 2.29289C2.78546 1.90237 3.41863 1.90237 3.80915 2.29289L8.04105 6.52479L12.2729 2.29289C12.6635 1.90237 13.2966 1.90237 13.6872 2.29289L13.7892 2.39494C14.1797 2.78546 14.1797 3.41863 13.7892 3.80915L9.55731 8.04105L13.7669 12.2506Z'
    />
  </Vector>
)

CloseGlyph.displayName = 'CloseGlyph'
