/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { Spacer } from "@phobon/grimoire";
import { motion } from "framer-motion";

import { FluidStudy } from "@/components";
import { Meta } from "@/components/Meta";
import { Main } from "@/components/Layout/Main";
import { ShowcaseGrid } from "@/components/ShowcaseGrid";
import { spanAllColumns } from "@/data/constants";
import { HeroHeader } from "@/components/HeroHeader";

const ease = [0.33, 1, 0.68, 1];

const motionProps = {
  initial: "initial",
  animate: "visible",
};

const MotionSpacer = motion.custom(Spacer);

const Writing = ({ writing, ...props }) => (
  <React.Fragment>
    <Meta title="phbn" twitterCard="summary" />
    <Main {...props}>
      <HeroHeader>
        <span css={(theme) => ({ color: theme.colors.violets[5] })}>
          Projects&nbsp;
        </span>
        <span>and&nbsp;</span>
        <span css={(theme) => ({ color: theme.colors.accent[5] })}>
          case studies&nbsp;
        </span>
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
    </Main>
  </React.Fragment>
);

export const getStaticProps = async () => {
  const { default: writing = [] } = await import("../../data/writing.json");

  return {
    props: {
      writing,
    },
  };
};

export default Writing;
