/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react"
import { Text } from "@phobon/base"
import { motion } from "framer-motion"

import { maxWidth, spanAllColumns } from "@/data/constants"

const ease = [0.33, 1, 0.68, 1]

const motionProps = {
  initial: "initial",
  animate: "visible",
}

const MotionHeading = motion(Text, { forwardMotionProps: true })

export const HeroHeader = ({ children, ...props }) => (
  <MotionHeading
    as="h1"
    fullWidth
    fontSize={[9, 11]}
    lineHeight={[2, 1]}
    maxWidth={maxWidth}
    color="foreground"
    fontWeight="light"
    gridColumn={spanAllColumns}
    css={{
      "> span": {
        display: "inline-table",
      },
    }}
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
    {...props}
  >
    {children}
  </MotionHeading>
)
