import {
  system,
  Config,
  ResponsiveValue,
  ThemeValue,
  RequiredTheme,
} from "styled-system";

export type PaintProps = {
  fill?: ResponsiveValue<ThemeValue<"colors", RequiredTheme>>;
  stroke?: ResponsiveValue<ThemeValue<"colors", RequiredTheme>>;
};

const paintConfig: Config = {
  fill: {
    property: "fill",
    scale: "colors",
  },
  stroke: {
    property: "stroke",
    scale: "colors",
  },
};

export const paint = system(paintConfig);
