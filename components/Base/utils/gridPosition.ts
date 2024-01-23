import {
  compose,
  gridRow,
  gridColumn,
  gridArea,
  GridRowProps,
  GridColumnProps,
  GridAreaProps,
} from "styled-system";

export type GridPositionProps = GridRowProps & GridColumnProps & GridAreaProps;
export const gridPosition = compose(gridRow, gridColumn, gridArea);
