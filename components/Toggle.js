import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  space,
  borderRadius,
  position,
  zIndex,
  gridColumn,
  gridRow,
  gridArea,
  top,
  left,
  bottom,
  right,
  themeGet,
} from 'styled-system';

import Check from 'rmdi/lib/Check';
import Close from 'rmdi/lib/Close';

const ToggleButton = styled.button.attrs(props => ({
  disabled: props.isDisabled,
}))`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  position: relative;
  border: 0;
  cursor: pointer;

  transition:
    opacity 180ms ease-out,
    background-color 180ms ease-out;

  ${space}
  ${borderRadius}
  ${position}
  ${zIndex}
  ${gridColumn}
  ${gridRow}
  ${gridArea}
  ${top}
  ${left}
  ${bottom}
  ${right}

  width: 48px;
  height: 24px;
  color: ${props => props.theme.colors.background};

  &::before {
    content: '';
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.background};
    position: absolute;
    top: 3px;
    left: 3px;
    transition: transform 180ms cubic-bezier(0.19, 1, 0.22, 1);
  }

  &[aria-checked="true"] {
    background-color: ${props => themeGet('colors.' + props.toggledBg[0])(props)};
    justify-content: flex-start;
    &:hover {
      background-color: ${props => themeGet('colors.' + props.toggledBg[1])(props)};
    }
    &::before {
      transform: translateX(24px);
    }
  }

  &[aria-checked="false"] {
    background-color: ${props => props.theme.colors.grayscale[3]};
    justify-content: flex-end;
    &:hover {
      background-color: ${props => props.theme.colors.grayscale[2]};
    }
    &::before {
      transform: translateX(0);
    }
  }

  &:focus {
    outline: 0;
    &::after {
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      content: "";
      box-shadow: 0 0 0 2px ${props => props.theme.colors.guidance.focus};
      border-radius: ${props => props.theme.radii[props.borderRadius]}px;
      pointer-events: none;
      z-index: 1;
    }
  }

  &:disabled {
    opacity: 0.5;
    background-color: ${props => props.theme.colors.grayscale[6]};
    &::before {
      background-color: ${props => props.theme.colors.grayscale[5]};
    }
    color: ${props => props.theme.colors.grayscale[3]};
    pointer-events: none;
  }
`;

const Toggle = ({ isToggled, isDisabled, ...props }) => (
  <ToggleButton
    aria-checked={isToggled}
    aria-readonly={isDisabled}
    isDisabled={isDisabled}
    borderRadius={5}
    role="switch"
    {...props}>
    {isToggled ? <Check color="inherit" size="16" /> : <Close color="inherit" size="16" />}
  </ToggleButton>
);

Toggle.propTypes = {
  ...space.propTypes,
  ...borderRadius.propTypes,
  ...position.propTypes,
  ...zIndex.propTypes,
  ...gridColumn.propTypes,
  ...gridRow.propTypes,
  ...gridArea.propTypes,
  ...top.propTypes,
  ...left.propTypes,
  ...bottom.propTypes,
  ...right.propTypes,

  isToggled: PropTypes.bool,
  toggledBg: PropTypes.arrayOf(PropTypes.string),
};

Toggle.defaultProps = {
  isToggled: false,
  toggledBg: ['greens.3', 'greens.2'],
};

Toggle.displayName = 'Toggle';

export default Toggle;