import React from "react";
import {
  Heading,
  Stack,
  Text,
  Link as SignalLink,
  StackProps,
} from "@phobon/base";
import Link from "next/link";

import { PopImage } from "../PopImage";
import { SlideLink } from "../SlideLink";

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
  <Stack as="article" alignItems="flex-start" fullWidth {...props}>
    <Link href={href} passHref>
      <SignalLink fullWidth mb={5}>
        <PopImage
          fullWidth
          src={src}
          alt={title}
          fullHeight
          loading="eager"
          unsized
          maxHeight={450}
        />
      </SignalLink>
    </Link>

    <Text fontSize={[3, 4]} color="grayscale.4">
      {published}
    </Text>
    <Link href={href} passHref>
      <Heading as="h2" mb={3} lineHeight={1}>
        <SlideLink>{title}</SlideLink>
      </Heading>
    </Link>
    <Text fontSize={[4, 5]} color="grayscale.3" mb={3}>
      {description}
    </Text>
    <Link href={href} passHref>
      <SlideLink fontSize={[4, 5]}>Read more</SlideLink>
    </Link>
  </Stack>
);
