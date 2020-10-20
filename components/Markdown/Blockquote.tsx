import styled from "@emotion/styled";
import { space, SpaceProps } from "styled-system";
import { shouldForwardProp } from "@phobon/base";

export const Blockquote = styled("blockquote", { shouldForwardProp })<
  SpaceProps
>(
  (props) => ({
    position: "relative",
    "&::before": {
      position: "absolute",
      left: "-3rem",
      top: 0,
      bottom: 0,
      width: 4,
      backgroundColor: props.theme.colors.accent[8],
      content: "''",
    },
    "> *": {
      marginBottom: 0,
      fontStyle: "italic",
      color: props.theme.colors.grayscale[3],
    },
  }),
  space
);

Blockquote.defaultProps = {
  mb: 6,
};
