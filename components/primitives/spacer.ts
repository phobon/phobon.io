import { styled } from "@/design";

export const Spacer = styled("span", {
  alignSelf: "center",
  height: "2px",
  width: "100%",
  display: "block",
  minWidth: 0,

  variants: {
    pronounced: {
      true: {
        backgroundColor: "$grey4",
      },
      false: {
        backgroundColor: "$grey3",
      },
    },
  },

  defaultVariants: {
    pronounced: "false",
  },
});
