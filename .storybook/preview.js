import React from "react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@phobon/tokens";
import { Normalize, Box } from "@phobon/base";

const StoryBox = ({ children, ...props }) => (
  <ThemeProvider theme={theme}>
    <>
      <Box
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

export const decorators = [
  (Story) => (
    <StoryBox>
      <Story />
    </StoryBox>
  ),
];
