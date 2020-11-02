/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { Box, BoxProps } from "@phobon/base";
import Image from "next/image";

export interface IPictureProps {
  unsized?: boolean;
  loading?: "lazy" | "eager";
}

export type PictureProps = IPictureProps &
  BoxProps &
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;

export const Picture = ({ src, alt, loading, unsized, ...props }) => (
  <Box
    fullWidth
    {...props}
    css={{
      border: "1px solid green",
      img: {
        width: "100%",
        height: "auto",
      },
    }}
  >
    <Image src={src} alt={alt} loading={loading} unsized />
  </Box>
);

Picture.defaultProps = {
  loading: "lazy",
};
