/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { Stack, Text, Box } from '@phobon/base'

import { spanAllColumns } from '@/data/constants'

export const Ul = (props) => <Stack as='ul' space={2} {...props} />

Ul.defaultProps = {
  mb: 5,
  alignItems: 'flex-start',
  gridColumn: spanAllColumns,
}

export const Li = ({ children, ...props }) => (
  <Box
    as='li'
    {...props}
    pl={[4, 6]}
    css={{
      position: 'relative',
      '&::before': {
        position: 'absolute',
        left: 0,
        top: '2rem',
        content: "''",
        width: '1.5rem',
        height: '1.5rem',
        backgroundColor: 'hsl(216, 10%, 90%)',
        borderRadius: 4,
      },
    }}
  >
    <Text fontSize={[4, 5]} lineHeight={1.8} maxWidth='80ch' color='grayscale.3'>
      {children}
    </Text>
  </Box>
)
