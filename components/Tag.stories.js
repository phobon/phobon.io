import React from 'react';
import { Stack } from '@phobon/base';

import Tag from './Tag';

export default {
  component: Tag,
  title: 'Components/Tag',
};

export const withVaryingTextLengths = () => (
  <Stack space={2} alignItems="flex-start">
    <Tag>Tag</Tag>
    <Tag>Bigger Tag</Tag>
    <Tag>This is a long tag with long text and should truncate when it is too long</Tag>
  </Stack>
);

export const withDifferentColours = () => (
  <Stack space={2} alignItems="flex-start">
    <Tag bg="violets.5" color="white">Theme colours Tag</Tag>
    <Tag bg="accent.5" color="white">Accent Tag</Tag>
    <Tag bg="tomato" color="white">Tomato Tag</Tag>
    <Tag bg="yellow">Yellow Tag</Tag>
    <Tag bg="Purple" color="white">Purple Tag</Tag>
  </Stack>
);
