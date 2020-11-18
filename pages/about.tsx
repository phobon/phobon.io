/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { Stack } from "@phobon/base";
import { Spacer, useNotifications } from "@phobon/grimoire";
import { motion } from "framer-motion";

import { SlideLink, Experience } from "@/components";
import { Meta } from "@/components/Meta";
import { Main } from "@/components/Layout/Main";
import { maxWidth, spanAllColumns } from "@/data/constants";
import { HeroHeader } from "@/components/HeroHeader";

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

const AboutMe = ({ projects, writing, experiences, ...props }) => (
  <React.Fragment>
    <Meta title="phbn" description="about" twitterCard="summary" />
    <Main {...props}>
      <HeroHeader>
        <span>Some&nbsp;</span>
        <span css={(theme) => ({ color: theme.colors.violets[5] })}>
          things&nbsp;
        </span>
        <span>I've done &&nbsp;</span>
        <span css={(theme) => ({ color: theme.colors.accent[5] })}>
          places&nbsp;
        </span>
        <span>I've worked</span>
      </HeroHeader>

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
    </Main>
  </React.Fragment>
);

export const getStaticProps = async () => {
  const { default: unsortedExperiences = [] } = await import(
    "../data/experiences.json"
  );

  const experiences = unsortedExperiences.reverse();
  return {
    props: {
      experiences,
    },
  };
};

export default AboutMe;
