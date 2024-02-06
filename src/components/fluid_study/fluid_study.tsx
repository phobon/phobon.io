import Link from 'next/link'
import { motion, MotionProps } from 'framer-motion'

import ShiftImage from '@/components/shift_image'
import { css } from '@/design/css'
import Image from '../canvas/webgl_image'
import Text from '../canvas/webgl_text'

export type FluidStudyProps = {
  href?: string
  src?: string
  title?: string
  published?: string
  description?: string
  category?: string
  tags?: string[]
} & MotionProps &
  React.HTMLAttributes<HTMLDivElement>

export const FluidStudy = ({
  href,
  src,
  title,
  published,
  description,
  className,
  style,
  ...props
}: FluidStudyProps) => {
  return (
    <Link href={href} className={className} style={style}>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
          gap: '$3',
        })}
        {...props}
      >
        <Image src={src} alt={title} className={css({ width: '100%', height: 'auto' })} />

        <Text
          className={css({
            fontSize: {
              base: '$3',
              md: '$4',
            },
            color: '$slate10',
          })}
        >
          {published}
        </Text>
        <Text
          as='h2'
          className={css({
            fontSize: {
              base: '$6',
              md: '$7',
            },
            color: '$slate12',
          })}
        >
          {title}
        </Text>
        <Text
          as='p'
          className={css({
            fontSize: {
              base: '$4',
              md: '$5',
            },
            color: '$slate10',
          })}
        >
          {description}
        </Text>
        <Text
          className={css({
            fontSize: {
              base: '$4',
              md: '$5',
            },
          })}
        >
          Read more
        </Text>
      </div>
    </Link>
  )
}
