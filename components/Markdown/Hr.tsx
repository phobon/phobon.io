import { space, SpaceProps } from "styled-system";
import styled from "@emotion/styled";

export const Hr = styled("hr")<SpaceProps>(
  (props) => ({
    borderWidth: 2,
    borderStyle: "solid",
    width: "5%",
    borderColor: props.theme.colors.accent[9],
  }),
  space
);

Hr.defaultProps = {
  my: 5,
};
