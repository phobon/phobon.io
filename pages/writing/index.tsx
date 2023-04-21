/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react'
import { Stack } from '@phobon/base'
import { motion } from 'framer-motion'

import { FlatStudy } from '@/components/FlatStudy'
import { Meta } from '@/components/Meta'
import { Main } from '@/components/Layout/Main'
import { spanAllColumns } from '@/data/constants'
import { HeroHeader } from '@/components/HeroHeader'

const ease = [0.33, 1, 0.68, 1]

const motionProps = {
  initial: 'initial',
  animate: 'visible',
}

const MotionStack = motion(Stack, { forwardMotionProps: true })

const Writing = ({ writing, ...props }) => (
  <React.Fragment>
    <Meta title='phbn' twitterCard='summary' />
    <Main {...props}>
      <HeroHeader>
        <span>Some&nbsp;</span>
        <span css={(theme) => ({ color: theme.colors.violets[5] })}>writing&nbsp;</span>
        <span>about&nbsp;</span>
        <span css={(theme) => ({ color: theme.colors.accent[5] })}>projects</span>
        <span>I&apos;ve worked on</span>
      </HeroHeader>

      <MotionStack
        id='writing'
        as='section'
        gridColumn={spanAllColumns}
        space={9}
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
          <FlatStudy {...s} key={key} />
        ))}
      </MotionStack>
    </Main>
  </React.Fragment>
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
