import React from "react"
import { Vector, VectorProps } from "@phobon/base"

export const SunGlyph: React.FunctionComponent<VectorProps> = ({
  width = 16,
  height = 16,
  stroke = "grayscale.0",
  ...props
}) => (
  <Vector
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="none"
    stroke={stroke}
    {...props}
  >
    <g transform="matrix(3.4285714285714284,0,0,3.4285714285714284,0,0)">
      <g>
        <circle
          cx="7"
          cy="7"
          r="2.5"
          stroke="inherit"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></circle>
        <line
          x1="7"
          y1="0.5"
          x2="7"
          y2="2.5"
          stroke="inherit"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></line>
        <line
          x1="2.4"
          y1="2.4"
          x2="3.82"
          y2="3.82"
          stroke="inherit"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></line>
        <line
          x1="0.5"
          y1="7"
          x2="2.5"
          y2="7"
          stroke="inherit"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></line>
        <line
          x1="2.4"
          y1="11.6"
          x2="3.82"
          y2="10.18"
          stroke="inherit"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></line>
        <line
          x1="7"
          y1="13.5"
          x2="7"
          y2="11.5"
          stroke="inherit"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></line>
        <line
          x1="11.6"
          y1="11.6"
          x2="10.18"
          y2="10.18"
          stroke="inherit"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></line>
        <line
          x1="13.5"
          y1="7"
          x2="11.5"
          y2="7"
          stroke="inherit"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></line>
        <line
          x1="11.6"
          y1="2.4"
          x2="10.18"
          y2="3.82"
          stroke="inherit"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></line>
      </g>
    </g>
  </Vector>
)

SunGlyph.displayName = "SunGlyph"
