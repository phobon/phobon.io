import React from "react";
import {
  Heading,
  Stack,
  Text,
  Link as SignalLink,
  StackProps,
} from "@phobon/base";
import Link from "next/link";
import { motion, MotionProps } from "framer-motion";

import { PopImage } from "../PopImage";
import { SlideLink } from "../SlideLink";
import { TiltImage } from "../TiltImage";
import { ShiftImage } from "../ShiftImage";

const MotionStack = motion.custom(Stack);

export interface IFluidStudyProps {
  href?: string;
  src?: string;
  title?: string;
  published?: string;
  description?: string;
  category?: string;
  tags?: string[];
}

export type FluidStudyProps = IFluidStudyProps &
  StackProps &
  MotionProps &
  React.HTMLAttributes<HTMLDivElement>;

export const FluidStudy: React.FunctionComponent<FluidStudyProps> = ({
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
      fullWidth
      space={3}
      variants={{
        initial: { translateY: 16, opacity: 0 },
        visible: { translateY: 0, opacity: 1 },
      }}
      {...props}
    >
      <ShiftImage
        fullWidth
        src={src}
        alt={title}
        fullHeight
        loading="eager"
        maxHeight={450}
      />

      <Text fontSize={[3, 4]} color="grayscale.4">
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
    </MotionStack>
  </Link>
);
