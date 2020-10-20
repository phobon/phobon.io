import React from "react";
import { Box, BoxProps } from "@phobon/base";
import { LineHeightProps } from "styled-system";

export type SpanProps = BoxProps & LineHeightProps;

export const Span = ({ children, ...props }) => (
  <Box as="span" {...props}>
    {children}
  </Box>
);

Span.defaultProps = {
  lineHeight: "inherit",
  display: "inline-flex",
};
