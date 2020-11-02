import {
  compose,
  gridColumn,
  space,
  SpaceProps,
  GridColumnProps,
} from "styled-system";
import styled from "@emotion/styled";

import { spanAllColumns } from "@/data/constants";

export const Hr = styled("hr")<SpaceProps & GridColumnProps>(
  (props) => ({
    borderWidth: 2,
    borderStyle: "solid",
    width: "5%",
    borderColor: props.theme.colors.accent[9],
  }),
  compose(space, gridColumn)
);

Hr.defaultProps = {
  my: 5,
  gridColumn: spanAllColumns,
};
