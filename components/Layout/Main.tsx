import React from "react"
import { Grid, GridProps } from "@phobon/base"
import { motion } from "framer-motion"

import {
  maxWidth,
  gridGap,
  gridTemplateColumns,
  horizontalPadding,
} from "@/data/constants"

const container = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
}

const MotionMain = motion(Grid, { forwardMotionProps: true })

export type MainProps = GridProps & React.HTMLAttributes<HTMLDivElement>

export const Main: React.FunctionComponent<MainProps & any> = ({
  children,
  ...props
}) => (
  <MotionMain
    as="main"
    fullWidth
    maxWidth={maxWidth}
    px={horizontalPadding}
    py={[6, 10]}
    gridTemplateColumns={gridTemplateColumns}
    gridColumnGap={gridGap}
    gridRowGap={[7, 10]}
    variants={container}
    initial="hidden"
    animate="visible"
    exit="hidden"
    {...props}
  >
    {children}
  </MotionMain>
)
