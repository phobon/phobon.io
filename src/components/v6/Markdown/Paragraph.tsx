import React from 'react'
import { Text, TypographyProps } from '@/components/v6/Base/Core'

import { spanAllColumns } from '@/data/constants'

export type ParagraphProps = TypographyProps & React.HTMLAttributes<HTMLParagraphElement>

export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(({ children, ...props }, ref) => (
  <Text as='p' ref={ref} {...props}>
    {children}
  </Text>
))
Paragraph.displayName = 'Paragraph'

Paragraph.defaultProps = {
  fontSize: [4, 5],
  lineHeight: 1.8,
  color: 'foreground',
  mt: 0,
  mb: 5,
  maxWidth: '80ch',
  gridColumn: spanAllColumns,
}
