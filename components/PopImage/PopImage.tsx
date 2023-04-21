/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { Box } from '@phobon/base'
import Image from 'next/image'

export interface IPopImageProps {
  loading?: 'eager' | 'lazy'
}

export type PopImageProps = IPopImageProps & {
  src?: string
  width?: any
  height?: any
  color?: string
} & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export const PopImage: React.FunctionComponent<PopImageProps> = ({
  src,
  alt,
  color = 'accent',
  // loading = "lazy",
  width,
  height,
  ...props
}) => {
  return (
    <Box
      css={(theme) => ({
        transition: 'opacity 0.5s ease-out',
        position: 'relative',
        '&::before, &::after': {
          content: "''",
          width: 0,
          height: 0,
          border: '4px solid transparent',
          position: 'absolute',
          transition: 'transform 90ms ease-out',
        },
        '&::before': {
          borderRightColor: theme.colors[color][6],
          borderBottomColor: theme.colors[color][6],
          left: 0,
          top: -8,
          transform: 'translateY(8px)',
        },
        '&::after': {
          borderLeftColor: theme.colors[color][6],
          borderTopColor: theme.colors[color][6],
          right: -8,
          bottom: 5,
          transform: 'translateX(-8px)',
        },
        '> span': {
          '&::before': {
            content: "''",
            background: theme.colors[color][6],
            position: 'absolute',
            width: '100%',
            height: 'calc(100% - 5px)',
          },
        },
        img: {
          position: 'relative',
          maxWidth: '100%',
          maxHeight: '100%',
          height: 'auto',
          objectFit: 'cover',
          transition: 'transform 90ms ease-out',
          zIndex: 1,
        },
        '&:hover': {
          '&::before, &::after': {
            transform: 'translate(0, 0)',
          },
          img: {
            transform: 'translate(8px, -8px)',
          },
        },
      })}
      width={width}
      height={height}
      {...props}
    >
      <span>
        <Image src={src} alt={alt} width={width} height={height} />
      </span>
    </Box>
  )
}
