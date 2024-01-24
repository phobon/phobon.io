import React from 'react'

export const HamburgerGlyph = ({ width = 16, height = 16, fill = '$slate11', ...props }) => (
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
    <rect y='11' width='16' height='2' rx='1' />
    <rect y='3' width='16' height='2' rx='1' />
  </svg>
)
