export const focus = ({ theme }): any => ({
  "&:focus": {
    outline: 0,
    "&::after": {
      position: "absolute",
      top: -2,
      left: -2,
      right: -2,
      bottom: -2,
      content: '""',
      boxShadow: `0 0 0 2px ${theme.colors.guidance.focus}`,
      borderRadius: "inherit",
      pointerEvents: "none",
      zIndex: 1,
    },
  },
});
