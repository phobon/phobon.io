import { View, shaderMaterial } from '@react-three/drei'
import React, { MutableRefObject, ReactNode, useEffect, useMemo } from 'react'
import { Text as DreiText } from '@react-three/drei'
import { css } from '@/design/css'
import { Vector3, extend, useThree } from '@react-three/fiber'
import { Material, ShaderMaterial } from 'three'
import { PerspectiveCamera } from '@/helpers/perspective_camera'
import { cn } from '@/helpers/cn'
import { useTracker } from '@/helpers/use_tracker'

export type TextProps = {
  font?: string
  as?: any
} & Partial<Omit<WebGLTextProps, 'textRef' | 'children' | 'font' | 'scaleMultiplier'>> &
  React.HTMLAttributes<HTMLDivElement>

const Text = ({ className, children, font, as: Tag = 'span', ...props }: TextProps) => {
  const { trackRef, rect } = useTracker()

  return (
    <div
      className={css({
        position: 'relative',
      })}
    >
      <Tag
        ref={trackRef}
        className={cn(
          css({
            opacity: 0,
            display: 'inline-block',
          }),
          className,
        )}
      >
        {children}
      </Tag>

      <View
        track={undefined} // This is deprecated in drei, so setting to undefined here just to satisfy ts
        className={css({
          position: 'absolute',
          inset: 0,
        })}
      >
        <PerspectiveCamera makeDefault />
        <WebGLText textRef={trackRef} font={font} {...props}>
          {children}
        </WebGLText>
      </View>
    </div>
  )
}

type WebGLTextProps = {
  textRef: MutableRefObject<HTMLElement>
  children?: ReactNode
  material?: Material
  scale?: any
  font?: string
  fontOffsetY?: number
  fontOffsetX?: number
  overrideEmissive?: boolean
  color?: string
  scaleMultiplier?: number
}

export const WebGLText = ({
  textRef,
  children,
  material,
  scale,
  font = 'fonts/Geist-Regular.otf',
  fontOffsetY = 0,
  fontOffsetX = 0,
  overrideEmissive = false,
  color,
  scaleMultiplier = 1,
  ...props
}: WebGLTextProps) => {
  const { size } = useThree()

  const { textColor, fontSize, textAlign, lineHeight, letterSpacing } = useMemo(() => {
    if (!textRef.current) {
      return {}
    }
    const cs = window.getComputedStyle(textRef.current)

    // get color from parent if set to transparent
    let textColor = color || cs.color
    if (!color && cs.color === 'rgba(0, 0, 0, 0)' && textRef.current.parentElement) {
      textColor = window.getComputedStyle(textRef.current.parentElement).color
    }

    // font size relative letter spacing
    const letterSpacing = (parseFloat(cs.letterSpacing) || 0) / parseFloat(cs.fontSize)
    const lineHeight = (parseFloat(cs.lineHeight) || 0) / parseFloat(cs.fontSize)

    return {
      letterSpacing,
      lineHeight,
      textColor,
      fontSize: parseFloat(cs.fontSize) * scaleMultiplier,
      textAlign: cs.textAlign,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textRef, size, scale, color, scaleMultiplier]) // recalc on resize

  useEffect(() => {
    if (material && overrideEmissive) {
      // @ts-ignore
      material.emissive = color
    }
  }, [material, color, overrideEmissive])

  let xOffset = 0
  if (textAlign === 'left' || textAlign === 'start') {
    xOffset = scale?.[0] || 1 * -0.5
  } else if (textAlign === 'right' || textAlign === 'end') {
    xOffset = scale?.[0] || 1 * 0.5
  }

  const yOffset = scale ? scale[1] * 0.5 : size.height * 0.5

  // console.log({
  //   fontSize,
  //   textAlign,
  //   lineHeight,
  //   letterSpacing,
  //   xOffset,
  //   yOffset,
  //   positionX: xOffset + fontSize * fontOffsetX,
  // })
  const position: Vector3 = [xOffset + fontSize * fontOffsetX, yOffset + fontSize * fontOffsetY, 0]

  return (
    <group position={[-size.width / 2, 0, 0]}>
      <DreiText
        fontSize={fontSize}
        maxWidth={scale ? scale[0] : size.width}
        lineHeight={lineHeight}
        // @ts-ignore
        textAlign={textAlign}
        letterSpacing={letterSpacing}
        overflowWrap='break-word'
        font={font}
        color={textColor}
        // @ts-ignore
        anchorX={textAlign}
        anchorY='top' // so text moves down if row breaks
        position={position}
        material={material}
        {...props}
      >
        {children}
      </DreiText>
    </group>
  )
}

export default Text
