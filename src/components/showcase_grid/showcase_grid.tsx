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
        gridTemplateColumns: 'subgrid',
        gridTemplateRows: 'subgrid',
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
      {children}
    </motion.section>
  )
}
