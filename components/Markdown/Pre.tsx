import React from "react";
import { Text } from "@phobon/base";

// TODO: Export TextProps from @phobon/base

export const Pre = React.forwardRef<HTMLPreElement, any>(
  ({ children, ...props }, ref) => (
    <Text
      as="pre"
      ref={ref}
      css={(theme) => ({
        borderRadius: `${theme.radii[4]}px`,
        "> code": {
          fontSize: "inherit",
          lineHeight: "inherit",
        },
      })}
      {...props}
    >
      {children}
    </Text>
  )
);

Pre.defaultProps = {
  fontSize: [3, 4],
  lineHeight: 1.8,
  mt: 0,
  mb: 5,
  bg: "$gray1",
  color: "$gray9",
  px: 3,
  py: 2,
};
