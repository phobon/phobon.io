import React from 'react';
import { Box, Vector } from 'base';

import Toggle from './Toggle';

export default () => (
  <Box as="header" px={6} pt={6} justifyContent="space-between">
    <Vector width={32} height={32} viewBox="0 0 16 16">
      <path d="M9.6,6.72V9.28a.32.32,0,0,1-.32.32h-9A.32.32,0,0,1,0,9.28V3.52A.32.32,0,0,1,.32,3.2H2.88a.32.32,0,0,1,.32.32V6.08a.32.32,0,0,0,.32.32H9.28A.32.32,0,0,1,9.6,6.72Z"></path><rect x="9.6" width="6.4" height="3.2" rx="0.32" ry="0.32"></rect><path d="M16,9.92v5.76a.32.32,0,0,1-.32.32H9.92a.32.32,0,0,1-.32-.32V13.12a.32.32,0,0,1,.32-.32h2.56a.32.32,0,0,0,.32-.32V9.92a.32.32,0,0,1,.32-.32h2.56A.32.32,0,0,1,16,9.92Z"></path><rect y="12.8" width="3.2" height="3.2" rx="0.32" ry="0.32"></rect>
    </Vector>

    <Toggle />
  </Box>
);