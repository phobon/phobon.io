import React from 'react'
import { Main } from '@/components/layout/main'

export const Wrapper = ({ children, ...props }) => (
  <Main gridRowGap={2} {...props}>
    {children}
  </Main>
)
