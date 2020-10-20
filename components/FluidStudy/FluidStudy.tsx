import React from "react";
import { Heading, Stack, Text, Link as SignalLink } from "@phobon/base";
import Link from "next/link";

import { PopImage } from "../PopImage";
import { SlideLink } from "../SlideLink";

export const FluidStudy: React.FunctionComponent<any> = ({
  href,
  src,
  title,
  published,
  description,
  category,
  tags,
  heroPosition,
  ...props
}) => (
  <Stack as="article" fullWidth {...props} alignItems="flex-start">
    <Link href={href} passHref>
      <SignalLink fullWidth mb={5}>
        <PopImage fullWidth src={src} alt={title} fullHeight />
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

FluidStudy.defaultProps = {
  heroPosition: "left",
};
