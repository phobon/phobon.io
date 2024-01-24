import Link from 'next/link'
import { motion, MotionProps } from 'framer-motion'

import ShiftImage from '@/components/shift_image'
import { css } from '@/design/css'

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

export const FluidStudy: React.FunctionComponent<FluidStudyProps> = ({
  href,
  src,
  title,
  published,
  description,
  className,
  ...props
}) => {
  return (
    <Link href={href} className={className}>
      <motion.div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
          gap: '$3',
        })}
        variants={{
          initial: { translateY: 16, opacity: 0 },
          visible: { translateY: 0, opacity: 1 },
        }}
        {...props}
      >
        <ShiftImage src={src} alt={title} loading='eager' />

        <span
          className={css({
            fontSize: {
              base: '$3',
              md: '$4',
            },
            color: '$slate10',
          })}
        >
          {published}
        </span>
        <h2
          className={css({
            fontSize: {
              base: '$6',
              md: '$7',
            },
            color: '$slate12',
          })}
        >
          {title}
        </h2>
        <p
          className={css({
            fontSize: {
              base: '$4',
              md: '$5',
            },
            color: '$slate10',
          })}
        >
          {description}
        </p>
        <span
          className={css({
            fontSize: {
              base: '$4',
              md: '$5',
            },
          })}
        >
          Read more
        </span>
      </motion.div>
    </Link>
  )
}
