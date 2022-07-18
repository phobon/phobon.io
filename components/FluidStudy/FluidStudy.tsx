import React from "react";
import { Stack, Text, StackProps } from "@phobon/base";
import Link from "next/link";
import { motion, MotionProps } from "framer-motion";

import { SlideLink } from "../SlideLink";
import { ShiftImage } from "../ShiftImage";

const MotionStack = motion(Stack, { forwardMotionProps: true });

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

      <Text fontSize={[3, 4]} color="$gray3">
        {published}
      </Text>
      <SlideLink as="h2" fontSize={[6, 7]} fontWeight="light" color="$gray0">
        {title}
      </SlideLink>
      <Text as="p" fontSize={[4, 5]} color="$gray3">
        {description}
      </Text>
      <SlideLink as="span" fontSize={[4, 5]}>
        Read more
      </SlideLink>
    </MotionStack>
  </Link>
);
