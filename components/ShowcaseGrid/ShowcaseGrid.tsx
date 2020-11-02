/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { Grid, GridProps } from "@phobon/base";
import { Spacer } from "@phobon/grimoire";
import { motion } from "framer-motion";

import { gridGap, gridTemplateColumns } from "@/data/constants";

const MotionGrid = motion.custom(Grid);

export type ShowcaseGridProps = GridProps &
  React.HTMLAttributes<HTMLDivElement>;

export const ShowcaseGrid: React.FunctionComponent<ShowcaseGridProps & any> = ({
  children,
  ...props
}) => {
  // We want to alternate the size and position of the elements as
  // we go, so index 0 should be large, 1 should be small, 2 should be small, 3 should be large
  const columnSizes = {
    1: ["auto / span 7", "auto / span 5"],
    0: ["auto / span 5", "auto / span 7"],
  };
  let row = 1;
  let rowCount = 0;
  const mappedChildren = React.Children.map(children, (c: any, i) => {
    // if (row === 1) {
    //   const clonedElement = React.cloneElement(c, {
    //     gridRow: row,
    //     gridColumn: "1 / span 12",
    //   });
    //   row += 1;
    //   return clonedElement;
    // }

    let columnSize = columnSizes[row % 2];
    let column = columnSize[rowCount];

    const clonedElement = React.cloneElement(c, {
      gridColumn: ["1 / span 8", column],
    });

    // Increment the row count to determine appropriate layout
    if (rowCount === 1) {
      rowCount = 0;
      row += 1;
    } else {
      rowCount += 1;
    }

    return clonedElement;
  });

  return (
    <MotionGrid
      fullWidth
      {...props}
      gridColumnGap={gridGap}
      gridTemplateColumns={gridTemplateColumns}
    >
      {mappedChildren}
    </MotionGrid>
  );
};
