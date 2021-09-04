import React from "react"
import { Box, Stack, Text, Link as SignalLink, StackProps } from "@phobon/base"
import Link from "next/link"
import { motion, MotionProps } from "framer-motion"

import { SlideLink } from "../SlideLink"
import { ShiftImage } from "../ShiftImage"

const MotionStack = motion(Stack, { forwardMotionProps: true })

export interface IFlatStudyProps {
  href?: string
  src?: string
  title?: string
  published?: string
  description?: string
  category?: string
  tags?: string[]
}

export type FlatStudyProps = IFlatStudyProps &
  StackProps &
  MotionProps &
  React.HTMLAttributes<HTMLDivElement>

export const FlatStudy: React.FunctionComponent<FlatStudyProps> = ({
  href,
  src,
  title,
  published,
  description,
  category,
  tags,
  ...props
}) => (
  <Link href={href} passHref>
    <MotionStack
      as="a"
      alignItems="flex-start"
      flexDirection={["column", "row"]}
      fullWidth
      variants={{
        initial: { translateY: 16, opacity: 0 },
        visible: { translateY: 0, opacity: 1 },
      }}
      {...props}
    >
      <Box width={["100%", "50%"]} mr={[0, 5]}>
        <ShiftImage
          fullWidth
          src={src}
          alt={title}
          fullHeight
          loading="eager"
          maxHeight={450}
        />
      </Box>

      <Stack alignItems="flex-start" py={[0, 3]} space={3}>
        <Text fontSize={[3, 4]} color="grayscale.3">
          {published}
        </Text>
        <SlideLink
          as="h2"
          fontSize={[6, 7]}
          fontWeight="light"
          color="grayscale.0"
        >
          {title}
        </SlideLink>
        <Text as="p" fontSize={[4, 5]} color="grayscale.3">
          {description}
        </Text>
        <SlideLink as="span" fontSize={[4, 5]}>
          Read more
        </SlideLink>
      </Stack>
    </MotionStack>
  </Link>
)
