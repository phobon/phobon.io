import React from 'react';
import { Text } from '@phobon/base';

const defaultProps = {
  color: 'foreground',
  fontWeight: 'light',
  lineHeight: 1,
  mt: 0,
  mb: 4,
};

const H1 = props => <Text as="h1" fontSize={[8, 10]} {...defaultProps} {...props} />;
const H2 = props => <Text as="h2" fontSize={[7, 9]} {...defaultProps} mt={7} {...props} />;
const H3 = props => <Text as="h3" fontSize={[6, 8]} {...defaultProps} mt={7} {...props} />;

export { H1, H2, H3 }