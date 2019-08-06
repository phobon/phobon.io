/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled, { css } from 'styled-components';
import { compose, space, layout, width, typography } from 'styled-system';
import propTypes from '@styled-system/prop-types';
import PropTypes from 'prop-types';

const density = props => {
  const densityValues = {
    compact: 1,
    normal: 2,
    spacious: 3,
  };

  const d = densityValues[props.density];

  return css`
    thead {
      th {
        padding-top: ${props.theme.space[d]}px;
        padding-bottom: ${props.theme.space[d]}px;
      }
    }
    tbody {
      tr {
        td {
          padding-top: ${props.theme.space[d]}px;
          padding-bottom: ${props.theme.space[d]}px;
          padding-right: ${props.theme.space[props.horizontalCellPadding]}px;
        }
        &:first-child {
          td { 
            padding-top: ${props.theme.space[d]}px;
          }
        }
        &:last-child {
          td {
            border-bottom: 0;
            padding-bottom: ${props.theme.space[d]}px;
          }
        }
      }
    }
  `;
};

const showSeparator = props => props.showSeparator ? css`
  border-bottom: 1px dashed ${props.theme.colors.grayscale[7]};
`: css`
  border-bottom: 1px solid transparent;
`;

const tableSystem = compose(space, layout, width, typography);

const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
  color: ${props => props.theme.colors.foreground};
  box-sizing: border-box;
  border-bottom: 2px solid ${props => props.theme.colors.grayscale[7]};
  ${tableSystem}
  
  th, td {
    vertical-align: top;
    text-align: left;
    box-sizing: border-box;
    &:last-child {
      padding-right: 0;
    }
    &.cell--numeric {
      text-align: right;
    }
    &.cell--fill {
      width: 100%;
    }
    &.cell--truncate {
      position: relative;
      > * {
        position: absolute;
        left: 0;
        right: ${props => props.theme.space[3]}px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    &.cell--disabled {
      opacity: 0.3;
    }
  }
  thead {
    th {
      font-size: inherit;
      color: ${props => props.theme.colors.grayscale[1]};
      font-weight: ${props => props.theme.fontWeights.normal};
      white-space: pre;
      background-color: ${props => props.theme.colors.grayscale[8]};
      padding-right: ${props => props.theme.space[3]}px;
      border-bottom: 2px solid ${props => props.theme.colors.grayscale[7]};
      &:first-child {
        padding-left: ${props => props.theme.space[3]}px;
        border-radius: ${props => props.theme.radii[3]}px 0 0 0;
      }
      &:last-child {
        padding-right: ${props => props.theme.space[3]}px;
        border-radius: 0 ${props => props.theme.radii[3]}px 0 0;
      }
    }
  }
  tbody {
    tr {
      td {
        text-align: left;
        ${showSeparator}
        &:first-child {
          padding-left: ${props => props.theme.space[3]}px;
        }
        &:last-child {
          padding-right: ${props => props.theme.space[3]}px;
        }
      }
    }
  }
  ${density}
`;

const Table = ({ children, ...props }) => (
  <StyledTable {...props}>
    {children}
  </StyledTable>
);

Table.displayName = 'Table';

Table.propTypes = {
  ...propTypes.space,
  ...propTypes.layout,
  ...propTypes.typography,

  /** Horizontal padding */
  horizontalCellPadding: PropTypes.number,

  /** Whether to show a separator between rows, or not */
  showSeparator: PropTypes.bool,

  /** Information density */
  density: PropTypes.oneOf(['compact', 'normal', 'spacious']),
};

Table.defaultProps = {
  showSeparator: true,
  horizontalCellPadding: 5,
  density: 'spacious',
  mb: 5,
  mt: 0,
  fontSize: [4, 5],
};

export default Table;