import React from 'react'

export const SunGlyph = ({ width = 16, height = 16, fill = '$slate11', ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 16 16'
    xmlns='http://www.w3.org/2000/svg'
    style={{
      fill,
    }}
    {...props}
  >
    <g transform='matrix(3.4285714285714284,0,0,3.4285714285714284,0,0)'>
      <g>
        <circle cx='7' cy='7' r='2.5' stroke='inherit' strokeLinecap='round' strokeLinejoin='round'></circle>
        <line x1='7' y1='0.5' x2='7' y2='2.5' stroke='inherit' strokeLinecap='round' strokeLinejoin='round'></line>
        <line
          x1='2.4'
          y1='2.4'
          x2='3.82'
          y2='3.82'
          stroke='inherit'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></line>
        <line x1='0.5' y1='7' x2='2.5' y2='7' stroke='inherit' strokeLinecap='round' strokeLinejoin='round'></line>
        <line
          x1='2.4'
          y1='11.6'
          x2='3.82'
          y2='10.18'
          stroke='inherit'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></line>
        <line x1='7' y1='13.5' x2='7' y2='11.5' stroke='inherit' strokeLinecap='round' strokeLinejoin='round'></line>
        <line
          x1='11.6'
          y1='11.6'
          x2='10.18'
          y2='10.18'
          stroke='inherit'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></line>
        <line x1='13.5' y1='7' x2='11.5' y2='7' stroke='inherit' strokeLinecap='round' strokeLinejoin='round'></line>
        <line
          x1='11.6'
          y1='2.4'
          x2='10.18'
          y2='3.82'
          stroke='inherit'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></line>
      </g>
    </g>
  </svg>
)
