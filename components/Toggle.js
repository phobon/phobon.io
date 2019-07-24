import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { compose, space, borderRadius, position } from 'styled-system';
import propTypes from '@styled-system/prop-types';
import themeGet from '@styled-system/theme-get';
import { focus, Vector, gridPosition } from '@phobon/base';

const toggleSize = props => {
  const sizes = {
    s: css`
      width: ${props.theme.space[5]}px;
      height: ${props.theme.space[3]}px;
      padding-right: 4px;

      &::before {
        width: 10px;
        height: 10px;
      }

      &[aria-checked="true"] {
        &::before {
          transform: translateX(16px);
        }
      }
    `,
    m: css`
      width: ${props.theme.space[6]}px;
      height: ${props.theme.space[4]}px;
      padding-right: 6px;

      &::before {
        width: 18px;
        height: 18px;
      }

      &[aria-checked="true"] {
        &::before {
          transform: translateX(24px);
        }
      }
    `,
  };

  return sizes[props.size];
};

const toggleButtonStyles = compose(space, borderRadius, position);

const ToggleButton = styled.button`
  display: flex;
  box-sizing: border-box;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  padding: 0;
  border: 0;

  cursor: pointer;

  transition:
    opacity 120ms ease-out,
    background-color 120ms ease-out;

  svg {
    fill: white;
  }

  ${toggleButtonStyles}
  ${gridPosition}

  ${toggleSize}

  &::before {
    content: '';
    border-radius: 50%;
    background-color: ${props => props.theme.colors.background};
    position: absolute;
    top: 3px;
    left: 3px;
    transition: transform 180ms cubic-bezier(0.19, 1, 0.22, 1);
  }

  &[aria-checked="true"] {
    background-color: ${props => themeGet(`colors.${props.bg[0]}`)(props)};

    &:hover {
      background-color: ${props => themeGet(`colors.${props.bg[1]}`)(props)};
    }
  }

  &[aria-checked="false"] {
    background-color: ${props => props.theme.colors.grayscale[4]};

    &:hover {
      background-color: ${props => props.theme.colors.grayscale[3]};
    }

    &::before {
      transform: translateX(0);
    }
  }

  ${focus}

  &:disabled {
    opacity: 0.5;

    svg {
      fill: ${props => props.theme.colors.grayscale[4]};
    }

    background-color: ${props => props.theme.colors.grayscale[6]};

    &::before {
      background-color: ${props => props.theme.colors.grayscale[5]};
    }

    pointer-events: none;
  }
`;

const Toggle = ({ toggled, disabled, size, ...props }) => (
  <ToggleButton
    aria-checked={toggled}
    aria-readonly={disabled}
    disabled={disabled}
    borderRadius={5}
    size={size}
    role="switch"
    {...props}>
    {!toggled && (
      <Vector width={size === 'm' ? 12 : 8} height={size === 'm' ? 12 : 8} viewBox="0 0 16 16">
        <path d="M15.9999 1.77777L14.2222 0L7.99999 6.22219L1.7778 0L2.46126e-05 1.77777L6.22222 7.99996L0 14.2222L1.77777 16L7.99999 9.77774L14.2222 16L16 14.2222L9.77776 7.99996L15.9999 1.77777Z" />
      </Vector>
    )}
  </ToggleButton>
);

Toggle.propTypes = {
  ...propTypes.space,
  ...propTypes.borderRadius,
  ...propTypes.position,
  ...gridPosition.propTypes,

  size: PropTypes.oneOf(['s', 'm']),
  toggled: PropTypes.bool,
  bg: PropTypes.arrayOf(PropTypes.string),
};

Toggle.defaultProps = {
  size: 'm',
  toggled: false,
  bg: ['greens.6', 'greens.5'],
};

Toggle.displayName = 'Toggle';

export default Toggle;