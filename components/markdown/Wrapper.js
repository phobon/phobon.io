import React from 'react';
import { Stack } from '@phobon/base';

const Wrapper = ({ children }) => (
  <Stack fullWidth maxWidth={1280} px={[4, 6]} alignItems="flex-start" alignSelf="center">
    {children}
  </Stack>
);

export default Wrapper;