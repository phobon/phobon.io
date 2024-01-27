import { motion } from 'framer-motion'

import Meta from '@/components/layout/meta'
import FluidStudy from '@/components/fluid_study'
import { css } from '@/design/css'

const ease = [0.33, 1, 0.68, 1]

const motionProps = {
  initial: 'initial',
  animate: 'visible',
}

const Writing = ({ writing, ...props }) => (
  <>
    <Meta />
    <h1
      className={css({
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
      })}
    >
      <span>Some&nbsp;</span>
      <span
        className={css({
          color: '$purple8',
        })}
      >
        writing&nbsp;
      </span>
      <span>about&nbsp;</span>
      <span
        className={css({
          color: '$purple8',
        })}
      >
        projects
      </span>
      <span>I&apos;ve worked on</span>
    </h1>

    <motion.section
      id='writing'
      className={css({
        gridColumn: '1 / -1',
        gap: '$9',
      })}
      variants={{
        visible: {
          translateY: 0,
          opacity: 1,
          transition: {
            duration: 0.75,
            delay: 0.15,
            ease,
            staggerChildren: 0.25,
          },
        },
        initial: {
          translateY: 16,
          opacity: 0,
        },
      }}
      {...motionProps}
    >
      {writing.map(({ key, ...s }) => (
        <FluidStudy {...s} key={key} />
      ))}
    </motion.section>
  </>
)

export const getStaticProps = async () => {
  const { default: unsortedWriting = [] } = await import('../../data/writing.json')

  const writing = [...unsortedWriting].reverse()
  return {
    props: {
      writing,
    },
  }
}

export default Writing
