import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import StoryBox from './StoryBox';

addDecorator(withA11y);
addDecorator(story => <StoryBox>{story()}</StoryBox>);

configure(require.context('../components', true, /\.stories\.js$/), module);