import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { theme, Normalize, Box } from '@phobon/base';

const StoryBox = ({ children, ...props }) => (
  <ThemeProvider theme={theme}>
    <>
      <Box
        p={5}
        className="storybox"
        justifyContent="flex-start"
        alignItems="flex-start"
        {...props}
        fullWidth>
        {children}
      </Box>
      <Normalize />
    </>
  </ThemeProvider>
);

StoryBox.propTypes = {
  ...Box.propTypes,

  children: PropTypes.node,
};

StoryBox.defaultProps = {
  children: null,
};

export default StoryBox;