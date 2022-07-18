import { styled } from "@/design";

export const Button = styled("button", {
  position: "relative",
  border: "none",

  cursor: "pointer",
  borderRadius: "$2",
  transition: "fill 120ms ease-out, background-color 120ms ease-out",
  minHeight: "$space$5",
  padding: "0 $2",

  "&:disabled": {
    fill: "$grey7",
    color: "$grey8",
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: "$purple3",
        color: "$purple12",
        fill: "$purple12",

        "&:hover, &:focus": {
          backgroundColor: "$purple4",
          fill: "$purple12",
        },
      },
      secondary: {
        fill: "$grey10",
        color: "$grey10",
        backgroundColor: "$grey3",

        "&:hover, &:focus": {
          backgroundColor: "$grey4",
          fill: "$grey12",
        },
      },
      danger: {
        backgroundColor: "$red3",
        color: "$red12",
        fill: "$red12",

        "&:hover, &:focus": {
          backgroundColor: "$red4",
          fill: "$red12",
        },
      },
      success: {
        backgroundColor: "$green3",
        color: "$green12",
        fill: "$green12",

        "&:hover, &:focus": {
          backgroundColor: "$green4",
          fill: "$green12",
        },
      },
    },
    size: {
      medium: {},
      large: {
        padding: "$3 $4",
      },
    },
  },
  defaultVariants: {
    variant: "secondary",
    size: "medium",
  },
});
