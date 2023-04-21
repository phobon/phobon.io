import React from 'react'
import { Main } from '@/components/Layout/Main'

export const Wrapper = ({ children, ...props }) => (
  <Main gridRowGap={2} {...props}>
    {children}
  </Main>
)
