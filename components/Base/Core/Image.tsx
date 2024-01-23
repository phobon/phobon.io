import styled from '@emotion/styled'

import { imageStyles, ImageProps, imageSystem, responsive } from './imageProps'
import { shouldForwardProp } from '../utils'

export const Image = styled('img', { shouldForwardProp })<ImageProps>(imageStyles, imageSystem, responsive)

Image.displayName = 'Image'
