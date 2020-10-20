import React from "react";
import { Text } from "@phobon/base";

export const Paragraph = React.forwardRef<HTMLParagraphElement, any>(
  ({ children, ...props }, ref) => (
    <Text as="p" ref={ref} {...props}>
      {children}
    </Text>
  )
);

Paragraph.defaultProps = {
  fontSize: [4, 5],
  lineHeight: 1.8,
  color: "foreground",
  mt: 0,
  mb: 5,
  maxWidth: "80ch",
};
