/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { Text, Stack, Grid } from "@phobon/base";
import { Spacer } from "@phobon/grimoire";
import { motion } from "framer-motion";

import { SlideLink, FluidStudy, Project, Experience } from "@/components";
import { Meta } from "@/components/Meta";
import { Main } from "@/components/Layout/Main";
import { ShowcaseGrid } from "@/components/ShowcaseGrid";

const ease = [0.33, 1, 0.68, 1];

const container = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

const motionProps = {
  initial: "initial",
  animate: "visible",
};

const MotionStack = motion.custom(Stack);
const MotionHeading = motion.custom(Text);
const MotionGrid = motion.custom(Grid);
const MotionSpacer = motion.custom(Spacer);

const Index = ({ projects, writing, experiences, ...props }) => (
  <>
    <Meta title="phbn" twitterCard="summary" />
    <Main {...props}>
      <MotionHeading
        as="h1"
        fullWidth
        fontSize={[9, 10]}
        lineHeight={[2, 3]}
        maxWidth={1400}
        mb={[5, 0]}
        color="grayscale.3"
        fontWeight="light"
        gridColumn="1 / span 12"
        css={(theme) => ({
          "> span": {
            display: "inline-block",
          },
          "> * + *": {
            marginLeft: theme.space[2],
          },
        })}
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
        {...motionProps}
      >
        <span>Hi, I'm</span>
        <span>
          <SlideLink
            href="https://www.instagram.com/thenoumenon/"
            color="inherit"
          >
            Ben
          </SlideLink>
          .
        </span>
        <span>I'm a</span>
        <span css={(theme) => ({ color: theme.colors.violets[5] })}>
          developer
        </span>
        <span>&</span>
        <span css={(theme) => ({ color: theme.colors.accent[5] })}>
          designer
        </span>
        <span>based in Perth</span>
      </MotionHeading>

      {writing && (
        <ShowcaseGrid
          id="writing"
          as="section"
          gridColumn="1 / span 12"
          gridRowGap={9}
          css={{
            alignItems: "flex-start",
          }}
          variants={{
            visible: {
              translateY: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
                delay: 0.15,
                ease,
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
        css={{
          gridColumn: "1 / span 12",
        }}
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
          maxWidth={1400}
          alignSelf="center"
          alignItems="flex-start"
          space={[6, 9]}
          gridColumn="1 / span 12"
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
          maxWidth={1400}
          fullWidth
          gridTemplateColumns={["1fr", "repeat(2, 1fr)"]}
          gridAutoRows="auto"
          css={{ alignSelf: "center" }}
          gridGap={6}
          gridColumn="1 / span 12"
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

      <MotionSpacer
        length="100%"
        css={{
          gridColumn: "1 / span 12",
        }}
        variants={{
          visible: {
            opacity: 1,
            transition: {
              duration: 0.3,
              delay: 0.5,
              ease,
            },
          },
          initial: {
            opacity: 0,
          },
        }}
        {...motionProps}
      />
    </Main>
  </>
);

export const getStaticProps = async () => {
  const { default: projects = [] } = await import("../data/projects.json");
  const { default: writing = [] } = await import("../data/writing.json");
  const { default: experiences = [] } = await import(
    "../data/experiences.json"
  );
  return {
    props: {
      projects,
      writing,
      experiences,
    },
  };
};

export default Index;
