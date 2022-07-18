import React from "react";
import styled from "@emotion/styled";
import {
  compose,
  space,
  color,
  flexbox,
  SpaceProps,
  FlexboxProps,
  ColorProps,
} from "styled-system";
import {
  Text,
  gridPosition,
  shouldForwardProp,
  GridPositionProps,
} from "@phobon/base";

import { spanAllColumns } from "@/data/constants";

const figureSystem = compose(space, color, flexbox, gridPosition);

export interface IFigureProps {
  caption?: string;
}

export type FigureProps = IFigureProps &
  SpaceProps &
  FlexboxProps &
  GridPositionProps &
  ColorProps &
  React.HTMLAttributes<HTMLDivElement>;

const StyledFigure = styled("figure", { shouldForwardProp })<FigureProps>(
  {
    display: "flex",
    flex: "none",
    flexDirection: "column",
    width: "100%",
    position: "relative",
  },
  figureSystem
);

export const Figure = React.forwardRef<
  HTMLDivElement & IFigureProps,
  FigureProps
>(({ caption, children, ...props }, ref) => (
  <StyledFigure ref={ref} {...props}>
    {children}
    <Text
      mt={2}
      as="figcaption"
      fontSize={2}
      color="$gray3"
      css={{ alignSelf: "flex-start" }}
    >
      {caption}
    </Text>
  </StyledFigure>
));

Figure.defaultProps = {
  mb: 5,
  justifyContent: "center",
  alignItems: "center",
  gridColumn: spanAllColumns,
};
