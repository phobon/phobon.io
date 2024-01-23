/* eslint-disable react/no-array-index-key */
import React, { forwardRef } from 'react'
import styled from '@emotion/styled'
import { compose, space, layout, SpaceProps, LayoutProps } from 'styled-system'

import { gridPosition, GridPositionProps, DensityType, shouldForwardProp } from '../utils'

const density = (props: any) => {
  const densityValues = {
    compact: 1,
    normal: 2,
    spacious: 3,
  }

  const d = densityValues[props.density]

  return {
    thead: {
      th: {
        paddingTop: props.theme.space[d],
        paddingBottom: props.theme.space[d],
      },
    },
    tbody: {
      tr: {
        td: {
          paddingTop: props.theme.space[d],
          paddingBottom: props.theme.space[d],
          paddingRight: props.theme.space[props.horizontalCellPadding],
        },
        '&:first-child': {
          td: {
            paddingTop: props.theme.space[d],
          },
        },
        '&:last-child': {
          td: {
            borderBottom: 0,
            paddingBottom: props.theme.space[d],
          },
        },
      },
    },
  }
}

const tableSystem = compose(space, layout, gridPosition)

interface IColumn {
  fill?: boolean
  truncate?: boolean
  lines?: number
  variant?: 'numeric' | 'other'
  label?: string
}
type Column = IColumn &
  SpaceProps &
  React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>

interface IRow {
  id?: string | number
  cells: { content: React.ReactNode }[]
  disabled?: boolean
}

export interface ITableCoreProps {
  id?: any
  columns: IColumn[]
  rows: IRow[]
}
export interface ITableProps {
  horizontalCellPadding?: number
  showSeparator?: boolean
  density?: DensityType
}

export type TableProps = ITableCoreProps &
  ITableProps &
  SpaceProps &
  LayoutProps &
  GridPositionProps &
  React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>

type StyledTableProps = ITableProps &
  SpaceProps &
  LayoutProps &
  GridPositionProps &
  React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>

const StyledTable = styled('table', { shouldForwardProp })<StyledTableProps>(
  (props: any) => ({
    width: '100%',
    borderSpacing: 0,
    borderCollapse: 'separate',
    color: props.theme.colors.foreground,
    boxSizing: 'border-box',
    borderBottom: `2px solid ${props.theme.colors.grayscale[7]}`,
    'th, td': {
      verticalAlign: 'top',
      textAlign: 'left',
      boxSizing: 'border-box',
      '&:last-child': {
        paddingRight: 0,
      },
      '&.cell--numeric': {
        textAlign: 'right',
      },
      '&.cell--fill': {
        width: '100%',
      },
      '&.cell--truncate': {
        position: 'relative',
        '> *': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
        },
      },
      '&.cell--disabled': {
        opacity: 0.3,
      },
    },
    thead: {
      th: {
        fontSize: props.theme.fontSizes[1],
        color: props.theme.colors.grayscale[2],
        fontWeight: props.theme.fontWeights.normal,
        whiteSpace: 'pre',
        backgroundColor: props.theme.colors.grayscale[8],
        paddingRght: props.theme.space[3],
        borderBottom: `2px solid ${props.theme.colors.grayscale[7]}`,
        '&:first-child': {
          paddingLeft: props.theme.space[3],
          borderRadius: `${props.theme.radii[3]}px 0 0 0`,
        },
        '&:last-child': {
          paddingRight: props.theme.space[3],
          borderRadius: `0 ${props.theme.radii[3]}px 0 0`,
        },
      },
    },
    tbody: {
      tr: {
        td: {
          'text-align': 'left',
          borderBottom: props.showSeparator ? `1px dashed ${props.theme.colors.grayscale[7]}` : '1px solid transparent',
          '&:first-child': {
            paddingLeft: props.theme.space[3],
          },
          '&:last-child': {
            paddingRight: props.theme.space[3],
          },
        },
      },
    },
  }),
  tableSystem,
  gridPosition,
  density,
)

const colSystem = compose(space)
const Col = styled('col')<Column>(colSystem)

const Td = styled('td')<{ lines?: number }>(({ lines }: any) => ({
  '&.cell--truncate': {
    '> *': {
      '-webkit-line-clamp': lines ?? '1',
    },
  },
}))

export const Table: React.FunctionComponent<TableProps> = forwardRef<HTMLTableElement, TableProps>(
  ({ id, columns, rows, ...props }: TableProps, ref) => {
    const cols = columns.map(({ fill, truncate, ...rest }, i) => <Col key={`${id}__col__${i}`} {...rest} />)

    const header = columns.map((c, i) => (
      <th key={`${id}__header__${i}`} className={`${c.variant === 'numeric' ? 'cell--numeric' : ''}`}>
        {c.label}
      </th>
    ))

    const rowItems = rows.map((r, rowIndex) => {
      const cells = r.cells.map((c, cellIndex) => {
        const columnCell = columns[cellIndex]
        if (!columnCell) {
          throw Error(`Cell at index: ${cellIndex} is not found.`)
        }

        const { fill, truncate, lines, ...rest } = columns[cellIndex]
        const cell = `${fill ? 'cell--fill' : ''} 
        ${truncate ? 'cell--truncate' : ''} 
        ${r.disabled ? 'cell--disabled' : ''}`
        return (
          <Td key={`${r.id}-cell__${cellIndex}`} className={cell} lines={lines} style={rest as any}>
            <span>{c.content}</span>
          </Td>
        )
      })

      return <tr key={`${r.id}-row__${rowIndex}`}>{cells}</tr>
    })

    return (
      <StyledTable ref={ref} {...props}>
        <colgroup>{cols}</colgroup>
        <thead>
          <tr>{header}</tr>
        </thead>
        <tbody>{rowItems}</tbody>
      </StyledTable>
    )
  },
)

Table.displayName = 'Table'

Table.defaultProps = {
  id: Math.random() * 100,
  showSeparator: true,
  horizontalCellPadding: 5,
  columns: [],
  rows: [],
  density: 'normal',
}
