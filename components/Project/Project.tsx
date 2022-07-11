/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { Stack, Box, Text } from "@phobon/base";

import { SlideLink } from "../SlideLink";
import { ShiftImage } from "../ShiftImage";
import Link from "next/link";

export const Project = ({ project, ...props }) => {
  const { name, description, image, url } = project;
  return (
    <Link href={url} passHref>
      <Box
        as="a"
        {...props}
        fullWidth
        flexDirection={["column", "row"]}
        alignItems={["center", "flex-start"]}
      >
        {/* When this becomes a link to an internal project, it needs a Link */}

        <ShiftImage src={image} alt={name} loading="lazy" width={200} />
        <Stack
          flex={1}
          alignItems={["center", "flex-start"]}
          ml={[0, 5]}
          mt={[3, 0]}
          space={2}
        >
          <SlideLink as="h3" fontSize={[4, 5]} fontWeight="light">
            {name}
          </SlideLink>
          <Text
            fontSize={[4, 5]}
            color="grayscale.3"
            textAlign={["center", "left"]}
          >
            {description}
          </Text>
        </Stack>
      </Box>
    </Link>
  );
};
