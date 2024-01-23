import { LayoutStore, useLayoutStore } from '@/stores/use_layout_store'
import { useMemo } from 'react'

export type UseGridDimensionsProps = {
  width: number
  height: number
  squareGrid?: boolean
}

const gridConfigurationSelector = ({ gridConfiguration }): Pick<LayoutStore, 'gridConfiguration'> => ({
  gridConfiguration,
})

/**
 * Calculate the grid dimensions within a particular viewport
 */
export const useGridDimensions = (props: UseGridDimensionsProps) => {
  const { width, height, squareGrid } = props
  const { gridConfiguration } = useLayoutStore(gridConfigurationSelector)
  const { columns, rows, gutter, squareGrid: configSquareGrid } = gridConfiguration

  const useSquareGrid = squareGrid ?? configSquareGrid

  const dimensions = useMemo(() => {
    let columnWidth = width / columns - gutter
    const rowHeight = useSquareGrid ? columnWidth : height / rows - gutter

    return {
      columns,
      rows: useSquareGrid ? Math.floor(height / rowHeight) : rows,
      columnWidth,
      rowHeight,
    }
  }, [width, columns, gutter, useSquareGrid, height, rows])

  return dimensions
}

const gridConfigurationStylesSelector = ({
  gridConfigurationStyles,
}): Pick<LayoutStore, 'gridConfigurationStyles'> => ({
  gridConfigurationStyles,
})

export const useGridConfigurationStyles = () => {
  const { gridConfigurationStyles } = useLayoutStore(gridConfigurationStylesSelector)
  return { ...gridConfigurationStyles }
}
