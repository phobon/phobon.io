/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react'
import { Box, BoxProps } from '@/components/v6/Base/Core'
import Image from 'next/image'

export interface IPictureProps {
  loading?: 'lazy' | 'eager'
}

export type PictureProps = IPictureProps &
  BoxProps &
  React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export const Picture = ({ src, alt, loading, width, height, ...props }) => (
  <Box fullWidth {...props}>
    <Image src={src} alt={alt} loading={loading} width={width} height={height} />
  </Box>
)

Picture.defaultProps = {
  loading: 'lazy',
  layout: 'intrinsic',
}
