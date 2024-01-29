import { HTMLMotionProps, motion } from 'framer-motion'

import { navigationLinks } from '@/data/links'

import { NavigationLink } from './navigation_link'
import { CloseGlyph } from '@/components/glyphs/close_glyph'
import { css } from '@/design/css'
import { Button } from '@/components/primitives/button'

const ease = [0.33, 1, 0.68, 1]

export type NavigationProps = {
  closeNavigation: () => void
} & React.HTMLAttributes<HTMLDivElement> &
  HTMLMotionProps<'aside'>

export const Navigation = ({ color, closeNavigation, ...props }: NavigationProps) => {
  return (
    <motion.aside
      className={css({
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '1fr',
        placeItems: 'center',
      })}
      {...props}
      variants={{
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
            ease,
          },
        },
        hidden: {
          opacity: 0,
          transition: {
            staggerChildren: 0.03,
            delay: 0.3,
            ease,
          },
        },
        exit: {
          opacity: 0,
          transition: {
            staggerChildren: 0.03,
            delay: 0.3,
            ease,
          },
        },
      }}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      {closeNavigation && (
        <div
          className={css({
            py: {
              base: '$4',
              md: '$5',
            },
            display: 'flex',
            width: '100%',
            justifySelf: 'center',
            justifyContent: 'flex-start',
          })}
        >
          <Button aria-label='Close menu' variant='tertiary' onClick={closeNavigation} toggled>
            <CloseGlyph fill='white' />
          </Button>
        </div>
      )}

      <nav
        className={css({
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '$3',
        })}
      >
        {navigationLinks.map(({ id, ...rest }) => (
          <NavigationLink key={id} id={id} {...rest} color={color} onClick={closeNavigation} />
        ))}
      </nav>
    </motion.aside>
  )
}
