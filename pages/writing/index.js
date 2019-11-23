import React from "react";
import { Stack } from '@phobon/base';

import { useApi } from '../../hooks';
import { Study } from '../../components';
export default () => {
  const writing = useApi('/api/writing');
  return (
    <React.Fragment>
      {writing && (
        <Stack fullWidth space={8}>
          {writing.map(({key, ...s}) => (
            <Study key={key} {...s} />
          ))}
        </Stack>
      )}
    </React.Fragment>
  );
};