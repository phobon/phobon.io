/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { useState, useCallback } from "react";
import { Grid, GridProps } from "@phobon/base";
import { Button } from "@phobon/grimoire";
import { useAtom } from "jotai";

import {
  maxWidth,
  gridColumns,
  gridTemplateColumns,
  gridGap,
  horizontalPadding,
} from "@/data/constants";

import { debugAtom } from "@/atoms/debugAtom";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const GridHelper: React.FunctionComponent<
  GridProps & React.HTMLAttributes<HTMLDivElement>
> = ({ ...props }) => {
  const [{ showGrid }, setDebug] = useAtom(debugAtom);
  const [columns, setColumns] = useState<number>(gridColumns[1]);
  const onMediaQueryChanged = useCallback(
    (mql: MediaQueryList) =>
      mql.matches ? setColumns(gridColumns[0]) : setColumns(gridColumns[1]),
    []
  );
  useMediaQuery("screen and (max-width: 48em)", onMediaQueryChanged);

  return (
    <>
      <Button
        borderRadius={0}
        onClick={() =>
          setDebug((a) => ({
            ...a,
            showGrid: !a.showGrid,
          }))
        }
        variant="primary"
        shape="square"
        css={{
          position: "fixed",
          left: 0,
          bottom: 0,
          zIndex: 9999,
        }}
      />
      {showGrid && (
        <Grid
          fullWidth
          fullHeight
          gridTemplateColumns={gridTemplateColumns}
          gridTemplateRows="1fr"
          gridGap={gridGap}
          px={horizontalPadding}
          css={(theme) => ({
            maxWidth,
            position: "fixed",
            top: 0,
            right: 0,
            left: 0,
            margin: "0 auto",
            pointerEvents: "none",
            zIndex: 9999,
            "> div": {
              width: "100%",
              height: "100%",
              backgroundColor: theme.colors.reds[5],
              opacity: 0.4,
            },
          })}
          {...props}
        >
          {Array(columns)
            .fill("")
            .map((a, i) => (
              <div key={`GridHelper__Box__${i}`} />
            ))}
        </Grid>
      )}
    </>
  );
};
