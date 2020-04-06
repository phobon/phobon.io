import React from 'react';
import { Stack } from '@phobon/base';

import Toggle from './Toggle';

export default {
  component: Toggle,
  title: 'Components/Toggle',
};

class ToggleHelper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggled: false,
    };
  }

  render() {
    const { toggled } = this.state;

    return (
      <Toggle toggled={toggled} onClick={() => this.setState({ toggled: !toggled })} {...this.props} />
    );
  }
}

export const withDifferentStates = () => (
  <Stack space={3}>
    <Toggle tooltip="Toggled" toggled />
    <Toggle tooltip="Not toggled" />
    <Toggle tooltip="Disabled" disabled />
  </Stack>
);

export const withTheAbilityToToggle = () => (
  <ToggleHelper tooltip="cCick to toggle" />
);

export const withDifferentColours = () => (
  <Stack space={3}>
    <Toggle tooltip="Toggled blue" bg={['blues.6', 'blues.5']} toggled />
    <Toggle tooltip="Toggled purple" bg={['purples.6', 'purples.5']} toggled />
    <Toggle tooltip="Toggled orange" bg={['oranges.6', 'oranges.6']} toggled />
  </Stack>
);

export const withDifferentSizes = () => (
  <Stack space={3}>
    <Toggle tooltip="Small (s)" size="s" />
    <Toggle tooltip="Small (s)" size="s" toggled />
  </Stack>
);
