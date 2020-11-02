/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Grid } from "@phobon/base";

import { spanAllColumns } from "@/data/constants";

export const ImageGrid = ({ children, ...props }) => (
  <Grid
    {...props}
    css={{
      border: "1px solid red",
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
  gridColumn: spanAllColumns,
};
