/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import styled from "@emotion/styled";
import {
  compose,
  color,
  space,
  fontSize,
  fontWeight,
  lineHeight,
  ColorProps,
  SpaceProps,
  FontSizeProps,
  FontWeightProps,
  LineHeightProps,
} from "styled-system";

const slideLinkProps = compose(color, space, fontSize, fontWeight, lineHeight);

const Anchor = styled("a")(slideLinkProps);

export interface ISlideLinkProps {
  slideColor?: string;
  current?: boolean;
}

export type SlideLinkProps = ISlideLinkProps &
  ColorProps &
  SpaceProps &
  FontSizeProps &
  FontWeightProps &
  LineHeightProps &
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >;

export const SlideLink = React.forwardRef<HTMLSpanElement, SlideLinkProps>(
  ({ children, href, title, rel, current, slideColor, ...props }, ref) => (
    <Anchor
      href={href}
      title={title}
      rel={rel}
      css={{
        overflow: "hidden",
        zIndex: 1,
        lineHeight: "inherit",
        fontSize: "inherit",
        fontFamily: "inherit",
        "&:visited, &:focus": {
          textDecoration: "none",
        },
      }}
      {...props}
    >
      <span
        css={(theme) => ({
          lineHeight: "inherit",
          fontSize: "inherit",
          fontFamily: "inherit",
          backgroundImage: `linear-gradient(${theme.colors.grayscale[7]}, ${theme.colors.grayscale[7]})`,
          backgroundPosition: "0% 95%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 22%",
        })}
      >
        <span
          ref={ref}
          css={(theme) => ({
            lineHeight: "inherit",
            fontSize: "inherit",
            fontFamily: "inherit",
            textDecoration: "inherit",
            backgroundImage: `linear-gradient(${theme.colors[slideColor][7]}, ${theme.colors[slideColor][7]})`,
            backgroundPosition: "0% 95%",
            backgroundRepeat: "no-repeat",
            backgroundSize: `${current ? "100%" : "0%"} 22%`,
            transition: "background-size 90ms cubic-bezier(0.19, 1, 0.22, 1)",
            "&:hover, &:focus": {
              backgroundSize: "100% 22%",
            },
          })}
        >
          {children}
        </span>
      </span>
    </Anchor>
  )
);

SlideLink.defaultProps = {
  color: "foreground",
  slideColor: "accent",
};
