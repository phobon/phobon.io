/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { Text } from '@/components/Base/Core/Text'

import { spanAllColumns } from '@/data/constants'

export const Code = (props) => (
  <Text
    as='span'
    textStyle='monospace'
    display='inline'
    fontSize={[3, 4]}
    lineHeight='inherit'
    bg='accent.9'
    color='accent.2'
    px={2}
    py={1}
    css={{ borderRadius: 8 }}
    gridColumn={spanAllColumns}
    {...props}
  />
)
