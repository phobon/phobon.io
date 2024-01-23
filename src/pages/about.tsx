/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react'
import { Spacer } from '@/components/Base/Spacer'
import { motion } from 'framer-motion'

import { SlideLink, Experience, Paragraph, Span } from '@/components'
import Meta from '@/components/layout/meta'
import { Main } from '@/components/LayoutOld/Main'
import { maxWidth, spanAllColumns } from '@/data/constants'
import { HeroHeader } from '@/components/HeroHeader'
import useSWR from 'swr'
import { Stack } from '@/components/Base/Core/Stack'

const fetcher = (url) => fetch(url).then((res) => res.json())

const ease = [0.33, 1, 0.68, 1]

const motionProps = {
  initial: 'initial',
  animate: 'visible',
}

const MotionStack = motion(Stack, { forwardMotionProps: true })

const AboutMe = ({ ...props }) => {
  const { data, error } = useSWR('/api/experiences', fetcher)
  const experiences = data ? JSON.parse(data) : []
  return (
    <>
      <Meta description='about' />
      <Main {...props}>
        <HeroHeader>
          <span>I&apos;m Ben,&nbsp;</span>
          <span>a&nbsp;</span>
          <span css={(theme: any) => ({ color: theme.colors.violets[5] })}>developer&nbsp;</span>
          <span>&&nbsp;</span>
          <span css={(theme: any) => ({ color: theme.colors.accent[5] })}>designer&nbsp;</span>
          <span>based in Perth&nbsp;</span>
        </HeroHeader>

        <MotionStack
          fullWidth
          maxWidth={maxWidth}
          alignSelf='center'
          alignItems='flex-start'
          space={[6, 9]}
          gridColumn={spanAllColumns}
          as='section'
          variants={{
            visible: {
              translateY: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
                delay: 0.3,
                ease,
              },
            },
            initial: {
              opacity: 0,
              translateY: 16,
            },
          }}
          {...motionProps}
        >
          <Paragraph
            color='grayscale.3'
            css={(theme: any) => ({
              '> * + *': {
                marginLeft: theme.space[1],
              },
            })}
          >
            {`I've spent the last ${(new Date()?.getFullYear() || 2021) - 2005} years designing and building thoughtful,
          accessible digital experiences across a wide range of industries; from
          mining, to agriculture, to digital communications`}
          </Paragraph>

          <Paragraph
            color='grayscale.3'
            css={(theme: any) => ({
              '> * + *': {
                marginLeft: theme.space[1],
              },
            })}
          >
            Outside of what I do day-to-day - I love creative development and generative art; dogs of all shapes and
            sizes; and unleashing the competitive beast on the sporting field
          </Paragraph>

          <Paragraph
            color='grayscale.3'
            mb={0}
            css={(theme: any) => ({
              '> * + *': {
                marginLeft: theme.space[1],
              },
            })}
          >
            <span>You&apos;ll often find me enjoying time with my</span>
            <span>
              <SlideLink href='https://www.instagram.com/thestudiophysio/'>amazing partner</SlideLink>,
            </span>
            <span>and my</span>
            <span>
              <SlideLink href='https://www.instagram.com/kodi_lab/'>best friend</SlideLink>;
            </span>
            <span>or</span>
            <Span color='inherit' css={{ textDecoration: 'line-through' }}>
              shitposting
            </Span>
            <span>online</span>
          </Paragraph>
          <Spacer length='100%' />
          {experiences.map(({ key, ...e }) => (
            <React.Fragment key={key}>
              <Experience {...e} />
              <Spacer length='100%' />
            </React.Fragment>
          ))}
        </MotionStack>
      </Main>
    </>
  )
}

export default AboutMe
