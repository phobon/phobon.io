import React from "react"
import { Vector, VectorProps } from "@phobon/base"

export const MoonGlyph: React.FunctionComponent<VectorProps> = ({
  width = 16,
  height = 16,
  fill = "grayscale.0",
  ...props
}) => (
  <Vector width={width} height={height} viewBox="0 0 48 48" {...props}>
    <g transform="matrix(3.4285714285714284,0,0,3.4285714285714284,0,0)">
      <path
        fill="inherit"
        stroke={fill as any}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12,10.48A6.55,6.55,0,0,1,6.46.5a6.55,6.55,0,0,0,1,13A6.46,6.46,0,0,0,13,10.39,6.79,6.79,0,0,1,12,10.48Z"
      ></path>
    </g>
  </Vector>
)

MoonGlyph.displayName = "MoonGlyph"
