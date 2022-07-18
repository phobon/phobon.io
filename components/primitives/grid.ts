import { CSS, css, styled } from "@/design";

const gridStyles: CSS = {
  display: "grid",
  placeItems: "center",
  boxSizing: "border-box",
  minWidth: 0,
  color: "$foreground",
};

export const grid = css(gridStyles);
export const Grid = styled("div", gridStyles);

Grid.displayName = "Grid";
