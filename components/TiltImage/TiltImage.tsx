/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useRef, useEffect } from "react";
import { Box, BoxProps, Image } from "@phobon/base";
import { animate } from "popmotion";
import { motion } from "framer-motion";

const MotionImage = motion.custom(Image);

export interface ITiltImageProps {
  loading?: "eager" | "lazy";
  unsized?: boolean;
  factor?: number;
  perspective?: number;
}

export type TiltImageProps = ITiltImageProps &
  BoxProps &
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;

export const TiltImage: React.FunctionComponent<TiltImageProps> = ({
  src,
  alt,
  loading = "lazy",
  width,
  height,
  factor = 8,
  perspective = 1000,
  ...props
}) => {
  const sceneRef = useRef(null);
  const planeRef = useRef(null);

  useEffect(() => {
    let hovered = false;

    const enter = () => {
      hovered = true;
    };
    const leave = () => {
      hovered = false;
      planeRef.current.style.transform = "rotateY(0) rotateX(0)";
    };
    const perspectiveShift = (e) => {
      if (!hovered) {
        return;
      }

      requestAnimationFrame(() => {
        const { width, height } = planeRef.current.getBoundingClientRect();
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        const x = e.offsetX;
        const y = e.offsetY;

        // Normalise around origin
        const normalizeY = ((x - halfWidth) / halfWidth) * factor;
        const normalizeX = (-(y - halfHeight) / halfHeight) * factor;

        const transform = `rotateY(${normalizeY}deg) rotateX(${normalizeX}deg)`;
        console.log(transform);
        planeRef.current.style.transform = transform;
      });
    };

    sceneRef.current.addEventListener("mouseenter", enter);
    sceneRef.current.addEventListener("mouseleave", leave);
    sceneRef.current.addEventListener("mousemove", perspectiveShift);

    return () => {
      sceneRef.current.removeEventListener("mouseenter", enter);
      sceneRef.current.removeEventListener("mouseleave", leave);
      sceneRef.current.removeEventListener("mousemove", perspectiveShift);
    };
  }, []);

  return (
    <Box
      width={width}
      height={height}
      ref={sceneRef}
      css={{
        position: "relative",
        transformStyle: "preserve-3d",
        perspective,
        "> img": {
          width: "100%",
          height: "auto",
          objectFit: "cover",
        },
      }}
      {...props}
    >
      <MotionImage
        ref={planeRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        css={{
          transition: "transform 120ms ease-out",
          transform: "rotateY(0) rotateX(0)",
        }}
        whileTap={{
          scale: 0.98,
        }}
      />
    </Box>
  );
};
