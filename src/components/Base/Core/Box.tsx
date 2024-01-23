import styled from '@emotion/styled'
import { compose, flexbox, FlexboxProps } from 'styled-system'

import { containerSystem, ContainerProps, containerStyles } from './containerProps'
import { shouldForwardProp } from '../utils'

export const boxSystem = compose(containerSystem, flexbox)

export type BoxProps = ContainerProps & FlexboxProps

export const Box = styled('div', { shouldForwardProp })<BoxProps>(
  {
    display: 'flex',
    flex: 'none',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerStyles,
  boxSystem,
)

Box.displayName = 'Box'

Box.defaultProps = {
  color: 'foreground',
}
