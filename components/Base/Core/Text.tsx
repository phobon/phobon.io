import styled from '@emotion/styled'

import { TypographyProps, typographyStyles, typographySystem } from './typographyProps'
import { shouldForwardProp } from '../utils'

export const Text = styled('span', { shouldForwardProp })<TypographyProps & any>(typographyStyles, typographySystem)

Text.displayName = 'Text'

Text.defaultProps = {
  color: 'foreground',
  fontSize: 1,
  textAlign: 'left',
  lineHeight: 4,
}
