import React from "react";
import { Text } from "@phobon/base";

import { HeroHeader } from "@/components/HeroHeader";

import { spanAllColumns } from "@/data/constants";

const defaultProps = {
  color: "foreground",
  fontWeight: "light",
  lineHeight: 1,
  mt: 0,
  mb: 4,
  gridColumn: spanAllColumns,
};

export const H1 = React.forwardRef<HTMLHeadingElement, any>(
  ({ children, ...props }, ref) => {
    return (
      <HeroHeader {...defaultProps} mb={[7, 0]} {...props} ref={ref}>
        {children}
      </HeroHeader>
    );
  }
);

export const H2 = React.forwardRef<HTMLHeadingElement, any>(
  ({ children, ...props }, ref) => (
    <Text
      as="h2"
      fontSize={[7, 9]}
      {...defaultProps}
      mt={7}
      {...props}
      ref={ref}
    >
      {children}
    </Text>
  )
);

export const H3 = React.forwardRef<HTMLHeadingElement, any>(
  ({ children, ...props }, ref) => (
    <Text
      as="h3"
      fontSize={[6, 8]}
      {...defaultProps}
      mt={7}
      {...props}
      ref={ref}
    >
      {children}
    </Text>
  )
);
