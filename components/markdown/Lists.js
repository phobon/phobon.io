import React from 'react';
import { Stack, Text, Box } from '@phobon/base';

const Ul = props => <Stack as="ul" {...props} space={2} />;

Ul.defaultProps = {
  mb: 5,
  alignItems: 'flex-start',
};

const Li = ({ children, ...props }) => (
  <Box
    as="li"
    {...props}
    pl={[4, 6]}
    css={`
      position: relative;
      &::before {
        position: absolute;
        left: 0;
        top: 2rem;
        content: "";
        width: 1.5rem;
        height: 1.5rem;
        background-color: hsl(216, 10%, 90%);
        border-radius: 4px;
      }
    `}>
    <Text fontSize={[4, 5]} lineHeight={1.8} maxWidth="80ch" color="grayscale.4">{children}</Text>
  </Box>
);

export {
  Ul, Li,
};