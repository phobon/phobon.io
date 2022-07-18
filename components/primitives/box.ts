import { CSS, css, styled } from "@/design";

const boxStyles: CSS = {
  display: "flex",
  flex: "none",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  minWidth: 0,
  color: "$foreground",
};

export const box = css(boxStyles);
export const Box = styled("div", boxStyles);

Box.displayName = "Box";
