/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react'
import { Spacer } from '@/components/v6/Base/Spacer'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { FluidStudy, Project, Experience } from '@/components'
import { SlideLink } from '@/components/slide_link'
import Meta from '@/components/layout/meta'
import { Main } from '@/components/layout/main'
import { ShowcaseGrid } from '@/components/v6/ShowcaseGrid'
import { maxWidth, spanAllColumns } from '@/data/constants'
import { HeroHeader } from '@/components/v6/HeroHeader'
import useSWR from 'swr'
import { Stack } from '@/components/v6/Base/Core/Stack'
import { Grid } from '@/components/v6/Base/Core/Grid'

const fetcher = (url) => fetch(url).then((res) => res.json())

const ease = [0.33, 1, 0.68, 1]

const motionProps = {
  initial: 'initial',
  animate: 'visible',
}

const MotionStack = motion(Stack, { forwardMotionProps: true })
const MotionGrid = motion(Grid, { forwardMotionProps: true })
const MotionSpacer = motion(Spacer, { forwardMotionProps: true })

const useData = () => {
  const { data: projectsData, error: projectsError } = useSWR('/api/projects', fetcher)
  const { data: experiencesData, error: experiencesError } = useSWR('/api/experiences', fetcher)
  const { data: writingData, error: writingError } = useSWR('/api/writing', fetcher)

  const projects = projectsData ? JSON.parse(projectsData) : []
  const experiences = experiencesData ? JSON.parse(experiencesData) : []
  const writing = writingData ? JSON.parse(writingData) : []

  return {
    projects,
    experiences,
    writing,
  }
}

const Index = ({ ...props }) => {
  const { projects, experiences, writing } = useData()

  return (
    <>
      <Meta />
      <Main {...props}>
        <HeroHeader>
          <span>I&apos;m&nbsp;</span>
          <span>
            <SlideLink href='/about'>Ben</SlideLink>
          </span>
          <span>, a&nbsp;</span>
          <span css={(theme: any) => ({ color: theme.colors.violets[5] })}>developer&nbsp;</span>
          <span>&&nbsp;</span>
          <span css={(theme: any) => ({ color: theme.colors.accent[5] })}>designer&nbsp;</span>
          <span>based in Perth&nbsp;</span>
        </HeroHeader>

        {writing && (
          <ShowcaseGrid
            id='writing'
            as='section'
            gridColumn={spanAllColumns}
            gridRowGap={9}
            css={{
              alignItems: 'flex-start',
            }}
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
          </ShowcaseGrid>
        )}

        <MotionSpacer
          length='100%'
          gridColumn={spanAllColumns}
          variants={{
            visible: {
              opacity: 1,
              transition: {
                duration: 0.3,
                delay: 0.15,
                ease,
              },
            },
            initial: {
              opacity: 0,
            },
          }}
          {...motionProps}
        />

        {experiences && (
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
            {experiences.map(({ key, ...e }) => (
              <React.Fragment key={key}>
                <Experience {...e} />
                <Spacer length='100%' />
              </React.Fragment>
            ))}
          </MotionStack>
        )}

        {projects && (
          <MotionGrid
            maxWidth={maxWidth}
            fullWidth
            gridTemplateColumns={['1fr', 'repeat(2, 1fr)']}
            gridAutoRows='auto'
            css={{ alignSelf: 'center' }}
            gridGap={6}
            gridColumn={spanAllColumns}
            as='section'
            variants={{
              visible: {
                translateY: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                  delay: 0.5,
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
            {projects.map((p) => (
              <Project key={p.name} project={p} alignSelf='flex-start' />
            ))}
          </MotionGrid>
        )}
      </Main>
    </>
  )
}

export default Index
