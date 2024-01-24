import { css } from '@/design/css'
import { cn } from '@/helpers/cn'
import { HTMLMotionProps, motion } from 'framer-motion'

const ease = [0.33, 1, 0.68, 1]

export type HeroHeaderProps = {} & React.HTMLAttributes<HTMLHeadingElement> & HTMLMotionProps<'h1'>

export const HeroHeader = ({ className, children, ...props }: HeroHeaderProps) => (
  <motion.h1
    className={cn(
      css({
        width: '100%',
        color: '$slate12',
        fontWeight: 'light',
        gridColumn: '1 / -1',
        fontSize: {
          base: '$9',
          md: '$11',
        },
        lineHeight: {
          base: '$2',
          md: '$1',
        },
        '&> span': {
          display: 'inline-table',
        },
      }),
      className,
    )}
    variants={{
      visible: {
        translateY: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: 0,
          ease,
        },
      },
      initial: {
        translateY: 16,
        opacity: 0,
      },
    }}
    initial='initial'
    animate='visible'
    {...props}
  >
    {children}
  </motion.h1>
)
