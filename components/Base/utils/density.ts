import { system } from "styled-system";

export type DensityType = "compact" | "normal" | "spacious";
export interface DensityProps {
  density?: DensityType;
}
export const density = system({
  density: {
    property: "height",
    transform: (n) => {
      const densities = {
        compact: {
          height: 32,
        },
        normal: {
          height: 40,
        },
        spacious: {
          height: 48,
        },
      };

      return densities[n];
    },
  },
});
