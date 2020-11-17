import React from "react";
import { Stack } from "@phobon/base";
import { theme } from "@phobon/tokens";

import { PopImage } from "./PopImage";

export default {
  component: PopImage,
  title: "Components/PopImage",
};

export const withDefaultProps = () => (
  <PopImage src="https://source.unsplash.com/random/300x100" />
);

export const withDifferentColours = () => {
  const excludedItems = [
    "accent",
    "black",
    "white",
    "background",
    "foreground",
    "guidance",
  ];
  const colours = Object.keys(theme.colors).filter(
    (o) => excludedItems.indexOf(o) === -1
  );
  return (
    <Stack space={3}>
      {colours.map((c) => (
        <PopImage
          src="https://source.unsplash.com/random/300x100"
          color={c}
          key={c}
        />
      ))}
    </Stack>
  );
};
