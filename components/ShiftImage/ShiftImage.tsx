/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react"
import { useRef, useEffect } from "react"
import { Box, BoxProps, Image } from "@phobon/base"
import { motion } from "framer-motion"

const MotionImage = motion(Image, { forwardMotionProps: true })

export interface IShiftImageProps {
  loading?: "eager" | "lazy"
  factor?: number
  perspective?: number
}

export type ShiftImageProps = IShiftImageProps &
  BoxProps &
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >

export const ShiftImage: React.FunctionComponent<ShiftImageProps> = ({
  src,
  alt,
  loading = "lazy",
  width,
  height,
  factor = 8,
  ...props
}) => {
  const sceneRef = useRef<HTMLDivElement>(null)
  const planeRef = useRef<HTMLImageElement>(null)
  const hovered = useRef<boolean>(false)
  const boundingRef = useRef<{ width?: number; height?: number }>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!planeRef.current) {
      return
    }

    boundingRef.current = planeRef.current.getBoundingClientRect()

    const enter = () => {
      hovered.current = true
    }

    const leave = () => {
      hovered.current = false
      rafRef.current = requestAnimationFrame(() => {
        if (!planeRef.current) {
          return
        }

        planeRef.current.style.transform = "scale(1) translate3d(0, 0, 0)"
      })
    }

    const layoutShift = (e) => {
      if (!hovered.current) {
        return
      }

      const { width, height } = boundingRef.current
      const halfWidth = width / 2
      const halfHeight = height / 2

      // Normalise around origin
      const normalizeY = ((e.offsetX - halfWidth) / halfWidth) * factor
      const normalizeX = ((e.offsetY - halfHeight) / halfHeight) * factor
      const transform = `scale(1) translate3d(${normalizeY}px, ${normalizeX}px, 0)`

      rafRef.current = requestAnimationFrame(() => {
        if (!planeRef.current) {
          return
        }

        planeRef.current.style.transform = transform
      })
    }

    sceneRef.current.addEventListener("mouseenter", enter)
    sceneRef.current.addEventListener("mouseleave", leave)
    sceneRef.current.addEventListener("mousemove", layoutShift)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      if (sceneRef.current) {
        sceneRef.current.removeEventListener("mouseenter", enter)
        sceneRef.current.removeEventListener("mouseleave", leave)
        sceneRef.current.removeEventListener("mousemove", layoutShift)
      }
    }
  }, [planeRef.current])

  return (
    <Box
      width={width}
      height={height}
      ref={sceneRef}
      css={{
        position: "relative",
        transformStyle: "preserve-3d",
        "> img": {
          width: "100%",
          height: "auto",
          objectFit: "cover",
          maxWidth: "inherit",
          maxHeight: "inherit",
          willChange: "transform",
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
          transition: "transform 240ms ease-out",
          transform: "scale(1) translate3d(0)",
        }}
      />
    </Box>
  )
}
