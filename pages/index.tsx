/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react"
import React from "react"
import { Text, Stack, Grid } from "@phobon/base"
import { Spacer } from "@phobon/grimoire"
import { motion } from "framer-motion"

import { SlideLink, FluidStudy, Project, Experience } from "@/components"
import { Meta } from "@/components/Meta"
import { Main } from "@/components/Layout/Main"
import { ShowcaseGrid } from "@/components/ShowcaseGrid"
import { maxWidth, spanAllColumns } from "@/data/constants"
import { HeroHeader } from "@/components/HeroHeader"

const ease = [0.33, 1, 0.68, 1]

const container = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
}

const motionProps = {
  initial: "initial",
  animate: "visible",
}

const MotionStack = motion(Stack, { forwardMotionProps: true })
const MotionGrid = motion(Grid, { forwardMotionProps: true })
const MotionSpacer = motion(Spacer, { forwardMotionProps: true })

const Index = ({ projects, writing, experiences, ...props }) => (
  <React.Fragment>
    <Meta title="phbn" twitterCard="summary" />
    <Main {...props}>
      <HeroHeader>
        <span>I'm&nbsp;</span>
        <span>
          <SlideLink
            href="https://www.instagram.com/thenoumenon/"
            color="inherit"
          >
            Ben
          </SlideLink>
          .&nbsp;
        </span>
        <span>I'm a&nbsp;</span>
        <span css={(theme) => ({ color: theme.colors.violets[5] })}>
          developer&nbsp;
        </span>
        <span>&&nbsp;</span>
        <span css={(theme) => ({ color: theme.colors.accent[5] })}>
          designer&nbsp;
        </span>
        <span>based in Perth&nbsp;</span>
      </HeroHeader>

      {writing && (
        <ShowcaseGrid
          id="writing"
          as="section"
          gridColumn={spanAllColumns}
          gridRowGap={9}
          css={{
            alignItems: "flex-start",
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
        length="100%"
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
          alignSelf="center"
          alignItems="flex-start"
          space={[6, 9]}
          gridColumn={spanAllColumns}
          as="section"
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
              <Spacer length="100%" />
            </React.Fragment>
          ))}
        </MotionStack>
      )}

      {projects && (
        <MotionGrid
          maxWidth={maxWidth}
          fullWidth
          gridTemplateColumns={["1fr", "repeat(2, 1fr)"]}
          gridAutoRows="auto"
          css={{ alignSelf: "center" }}
          gridGap={6}
          gridColumn={spanAllColumns}
          as="section"
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
            <Project key={p.name} project={p} alignSelf="flex-start" />
          ))}
        </MotionGrid>
      )}
    </Main>
  </React.Fragment>
)

export const getStaticProps = async () => {
  const { default: projects = [] } = await import("../data/projects.json")
  const { default: unsortedWriting = [] } = await import("../data/writing.json")
  const { default: unsortedExperiences = [] } = await import(
    "../data/experiences.json"
  )

  // Sort writing chronologically and only take the first 4
  const writing = [...unsortedWriting].reverse().slice(0, 4)

  // Sort experiences chronologically as well
  const experiences = [...unsortedExperiences].reverse()

  return {
    props: {
      projects,
      writing,
      experiences,
    },
  }
}

export default Index
