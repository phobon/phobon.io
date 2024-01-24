import React, { useEffect, useRef } from 'react'
import { HTMLMotionProps, motion } from 'framer-motion'
import { css } from '@/design/css'

export type ShowcaseGridProps = {} & HTMLMotionProps<'section'>

export const ShowcaseGrid: React.FunctionComponent<React.HTMLAttributes<HTMLDivElement> & ShowcaseGridProps> = ({
  children,
  ...props
}) => {
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
      // gridColumn: ['1 / span 8', 'auto / span 8', column],
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
    <motion.section
      className={css({
        display: 'grid',
        width: '100%',
        placeItems: 'start',
        pointerEvents: 'none',
        gridColumnGap: {
          base: '$6',
          md: '$8',
          lg: '$12',
        },
        alignItems: 'flex-start',
        gridRowGap: '$9',
        gridTemplateColumns: {
          base: 'repeat(6, 1fr)',
          md: 'repeat(8, 1fr)',
          lg: 'repeat(12, 1fr)',
        },
        gridColumn: '1 / -1',
        '&> .showcase': {
          pointerEvents: 'all',
          transition: 'filter 240ms ease-out, opacity 240ms ease-out',
          filter: 'grayscale(0) blur(0)',
          opacity: 1,
        },
        '&> .showcase--grayscale': {
          filter: 'grayscale(100%) blur(0)',
          opacity: 0.6,
        },
      })}
      ref={gridRef}
      {...props}
    >
      {mappedChildren}
    </motion.section>
  )
}
