import React from 'react';
import { Text } from '@phobon/base';

const defaultProps = {
  color: 'foreground',
  fontWeight: 'light',
  lineHeight: 0,
  mt: 0,
  mb: 3,
};

const H1 = props => <Text as="h1" fontSize={[8, 10]} {...defaultProps} {...props} />;
const H2 = props => <Text as="h2" fontSize={[7, 9]} {...defaultProps} {...props} />;
const H3 = props => <Text as="h3" fontSize={[6, 8]} {...defaultProps} {...props} />;

export { H1, H2, H3 }