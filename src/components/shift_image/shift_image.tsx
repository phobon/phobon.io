import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { css } from '@/design/css'

export type ShiftImageProps = {
  loading?: 'eager' | 'lazy'
  factor?: number
  perspective?: number
} & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export const ShiftImage = ({ src, alt, loading = 'lazy', width, height, factor = 8, ...props }: ShiftImageProps) => {
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

        planeRef.current.style.transform = 'scale(1) translate3d(0, 0, 0)'
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

    const scene = sceneRef.current

    scene.addEventListener('mouseenter', enter)
    scene.addEventListener('mouseleave', leave)
    scene.addEventListener('mousemove', layoutShift)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      if (scene) {
        scene.removeEventListener('mouseenter', enter)
        scene.removeEventListener('mouseleave', leave)
        scene.removeEventListener('mousemove', layoutShift)
      }
    }
  }, [factor])

  return (
    <div
      className={css({
        position: 'relative',
        transformStyle: 'preserve-3d',
        '&> img': {
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          maxWidth: 'inherit',
          maxHeight: 'inherit',
          // willChange: 'transform',
        },
      })}
      style={{
        width,
        height,
      }}
      ref={sceneRef}
      {...props}
    >
      <motion.img
        ref={planeRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={css({
          transition: 'transform 240ms ease-out',
          transform: 'scale(1) translate3d(0)',
        })}
      />
    </div>
  )
}
