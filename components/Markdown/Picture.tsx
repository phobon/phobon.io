import React from "react";
import { Box, BoxProps, ImageProps } from "@phobon/base";

export interface IPictureProps {
  fallbackExtension: "jpg" | "png";
  fallbackType: "jpeg" | "png";
  loading?: any;
}

export type PictureProps = IPictureProps &
  BoxProps &
  ImageProps &
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;

export const Picture = React.forwardRef<HTMLImageElement, PictureProps>(
  ({ src, fallbackExtension, fallbackType, alt, loading, ...props }, ref) => {
    const fallback = `${src}.${fallbackExtension}`;
    return (
      <Box as="picture" {...props}>
        <source srcSet={`${src}.webp`} type="image/webp" />
        <source srcSet={fallback} type={`image/${fallbackType}`} />
        <img src={fallback} alt={alt} {...props} loading={loading} ref={ref} />
      </Box>
    );
  }
);

Picture.defaultProps = {
  fallbackExtension: "jpg",
  fallbackType: "jpeg",
  loading: "lazy",
};
