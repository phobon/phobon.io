/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React, { useEffect, useRef } from 'react'
import { Grid, GridProps } from '@phobon/base'
import { motion } from 'framer-motion'

import { gridGap, gridTemplateColumns } from '@/data/constants'

const MotionGrid = motion(Grid, { forwardMotionProps: true })

export type ShowcaseGridProps = GridProps & React.HTMLAttributes<HTMLDivElement>

export const ShowcaseGrid: React.FunctionComponent<ShowcaseGridProps & any> = ({ children, ...props }) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const mouseEnter = (e) => {
      if (!e.target.classList.contains('showcase')) {
        return
      }

      e.stopPropagation()

      rafRef.current = requestAnimationFrame(() => {
        e.target.classList.add('showcase--hover')
        const notHovered = gridRef.current.querySelectorAll(':not(.showcase--hover)')
        notHovered.forEach((nh) => nh.classList.add('showcase--grayscale'))
      })
    }
    const mouseLeave = (e) => {
      if (!e.target.classList.contains('showcase--hover')) {
        return
      }

      e.stopPropagation()
      rafRef.current = requestAnimationFrame(() => {
        e.target.classList.remove('showcase--hover')
        const grayscaled = gridRef.current.querySelectorAll('.showcase--grayscale')
        grayscaled.forEach((nh) => nh.classList.remove('showcase--grayscale'))
      })
    }

    const grid = gridRef.current

    grid.addEventListener('mouseenter', mouseEnter, true)
    grid.addEventListener('mouseleave', mouseLeave, true)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      if (grid) {
        grid.removeEventListener('mouseenter', mouseEnter)
        grid.removeEventListener('mouseleave', mouseLeave)
      }
    }
  }, [])

  // We want to alternate the size and position of the elements as
  // we go, so index 0 should be large, 1 should be small, 2 should be small, 3 should be large
  const columnSizes = {
    1: ['auto / span 7', 'auto / span 5'],
    0: ['auto / span 5', 'auto / span 7'],
  }
  let row = 1
  let rowCount = 0
  const mappedChildren = React.Children.map(children, (c: any) => {
    const columnSize = columnSizes[row % 2]
    const column = columnSize[rowCount]

    const clonedElement = React.cloneElement(c, {
      gridColumn: ['1e / span 8', 'auto / span 8', column],
      className: 'showcase',
    })

    // Increment the row count to determine appropriate layout
    if (rowCount === 1) {
      rowCount = 0
      row += 1
    } else {
      rowCount += 1
    }

    return clonedElement
  })

  return (
    <MotionGrid
      fullWidth
      ref={gridRef}
      gridColumnGap={gridGap}
      gridTemplateColumns={gridTemplateColumns}
      css={{
        placeItems: 'start',
        pointerEvents: 'none',
        '> .showcase': {
          pointerEvents: 'all',
          transition: 'filter 240ms ease-out, opacity 240ms ease-out',
          filter: 'grayscale(0) blur(0)',
          opacity: 1,
        },
        '> .showcase--grayscale': {
          filter: 'grayscale(100%) blur(0)',
          opacity: 0.6,
        },
      }}
      {...props}
    >
      {mappedChildren}
    </MotionGrid>
  )
}
