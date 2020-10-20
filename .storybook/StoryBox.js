import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Normalize, Box } from "@phobon/base";
import { theme } from "@phobon/tokens";

const StoryBox = ({ children, ...props }) => (
  <ThemeProvider theme={theme}>
    <>
      <Box
        p={5}
        className="storybox"
        justifyContent="flex-start"
        alignItems="flex-start"
        {...props}
        fullWidth
      >
        {children}
      </Box>
      <Normalize />
    </>
  </ThemeProvider>
);

StoryBox.defaultProps = {
  children: null,
};

export default StoryBox;
