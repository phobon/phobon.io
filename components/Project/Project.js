/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { Stack, Box, Text } from "@phobon/base";

import SlideLink from "../SlideLink";
import PopImage from "../PopImage";

const Project = ({ project, ...props }) => {
  const {
    name,
    description,
    image,
    fallbackType,
    fallbackExtension,
    url,
  } = project;
  return (
    <Box
      as="article"
      {...props}
      fullWidth
      flexDirection={["column", "row"]}
      alignItems={["center", "flex-start"]}
    >
      {/* When this becomes a link to an internal project, it needs a Link */}
      <a href={url} css={{ width: 200 }}>
        <PopImage
          src={image}
          fallbackType={fallbackType}
          fallbackExtension={fallbackExtension}
          alt={name}
        />
      </a>
      <Stack
        flex={1}
        alignItems={["center", "flex-start"]}
        ml={[0, 5]}
        mt={[3, 0]}
      >
        <SlideLink
          fontSize={[5, 6]}
          fontWeight="bold"
          lineHeight={2}
          mb={[2, 0]}
          href={url}
        >
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
  );
};

export default Project;
