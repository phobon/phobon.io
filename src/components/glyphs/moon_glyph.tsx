import React from 'react'

export const MoonGlyph = ({ width = 16, height = 16, fill = '$slate11', ...props }) => (
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
      <path
        fill='inherit'
        stroke={fill as any}
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12,10.48A6.55,6.55,0,0,1,6.46.5a6.55,6.55,0,0,0,1,13A6.46,6.46,0,0,0,13,10.39,6.79,6.79,0,0,1,12,10.48Z'
      ></path>
    </g>
  </svg>
)
