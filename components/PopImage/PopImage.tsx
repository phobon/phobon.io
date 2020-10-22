/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Box, BoxProps } from "@phobon/base";

export interface IPopImageProps {
  fallbackExtension?: "jpg" | "png";
  fallbackType?: "jpeg" | "png";
  loading?: any;
}

export type PopImageProps = IPopImageProps &
  BoxProps &
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;

export const PopImage: React.FunctionComponent<PopImageProps> = ({
  src,
  alt,
  fallbackExtension,
  fallbackType,
  loading,
  ...props
}) => {
  const fallback = `${src}.${fallbackExtension}`;
  return (
    <Box
      as="picture"
      css={(theme) => ({
        background: theme.colors[props.color][6],
        transition: "opacity 0.5s ease-out",
        position: "relative",
        display: "flex",
        "&::before, &::after": {
          content: "''",
          width: 0,
          height: 0,
          border: "4px solid transparent",
          position: "absolute",
          transition: "transform 90ms ease-out",
        },
        "&::before": {
          borderRightColor: theme.colors[props.color][6],
          borderBottomColor: theme.colors[props.color][6],
          left: 0,
          top: -8,
          transform: "translateY(8px)",
        },
        "&::after": {
          borderLeftColor: theme.colors[props.color][6],
          borderTopColor: theme.colors[props.color][6],
          right: -8,
          bottom: 0,
          transform: "translateX(-8px)",
        },
        img: {
          width: "100%",
          height: "auto",
          position: "relative",
          objectFit: "cover",
          transition: "transform 90ms ease-out",
          zIndex: 1,
        },
        "&:hover": {
          "&::before, &::after": {
            transform: "translate(0, 0)",
          },
          img: {
            transform: "translate(8px, -8px)",
          },
        },
      })}
      {...props}
    >
      <source srcSet={`${src}.webp`} type="image/webp" />
      <source srcSet={fallback} type={`image/${fallbackType}`} />
      <img src={fallback} alt={alt} loading={loading} />
    </Box>
  );
};

PopImage.defaultProps = {
  color: "accent",
  fallbackType: "jpeg",
  fallbackExtension: "jpg",
  loading: "lazy",
};
