/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Grid } from "@phobon/base";

export const ImageGrid = ({ children, ...props }) => (
  <Grid
    {...props}
    css={{
      "> img": {
        justifySelf: "center",
      },
    }}
    fullWidth
  >
    {children}
  </Grid>
);

ImageGrid.defaultProps = {
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gridGap: 5,
};