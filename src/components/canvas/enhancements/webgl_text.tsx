'use client'

import { View, shaderMaterial } from '@react-three/drei'
import React, { MutableRefObject, ReactNode, useEffect, useRef } from 'react'
import { Text as DreiText } from '@react-three/drei'
import { css } from '@/design/css'
import { Vector3, extend, useThree } from '@react-three/fiber'
import { Material } from 'three'
import { PerspectiveCamera } from '@/helpers/perspective_camera'
import { cn } from '@/helpers/cn'
import { UseTrackerOptions, useTracker } from '@/helpers/use_tracker'
import { MotionValue, useMotionValueEvent } from 'framer-motion'
import { v4 as uuid } from 'uuid'
import { useMediaQuery } from '@uidotdev/usehooks'

export type TextProps = {
  font?: string
  as?: any
  testIntersection?: boolean
  trackerOptions?: UseTrackerOptions
  enhance?: boolean
} & Partial<Omit<WebGLTextProps, 'textRef' | 'children' | 'font' | 'scaleMultiplier'>> &
  any

const Text = ({ className, children, font, as: Tag = 'span', textStyles, enhance, ...props }: TextProps) => {
  const desktop = useMediaQuery('only screen and (min-width: 768px)')
  const { trackRef, intersecting, hidden } = useTracker({
    hide: enhance && desktop,
  })

  return (
    <span
      className={cn(
        css({
          position: 'relative',
          width: '100%',
        }),
        className,
      )}
    >
      <Tag
        ref={trackRef}
        className={cn(
          css({
            display: 'block',
          }),
          textStyles,
        )}
        {...props}
      >
        {children}
      </Tag>

      {hidden ? (
        <View
          className={css({
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          })}
        >
          <PerspectiveCamera makeDefault />
          <TextImpl textRef={trackRef} font={font} intersecting={intersecting}>
            {children}
          </TextImpl>
        </View>
      ) : null}
    </span>
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
  intersecting?: MotionValue<number>
}

const TextImpl = ({
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
  intersecting,
  ...props
}: WebGLTextProps) => {
  const { size } = useThree()
  const meshRef = useRef<any>(null)

  useMotionValueEvent(intersecting, 'change', (latest) => {
    if (!meshRef.current) {
      return
    }
    meshRef.current.material.uniforms.u_height.value = size.height
    meshRef.current.material.uniforms.u_progress.value = latest
  })

  const cs = window.getComputedStyle(textRef.current)

  // get color from parent if set to transparent
  let textColor = color || cs.color
  if (!color && cs.color === 'rgba(0, 0, 0, 0)' && textRef.current.parentElement) {
    textColor = window.getComputedStyle(textRef.current.parentElement).color
  }

  // convert color from an rgb string to an array of rgb values
  const textColorRgb = textColor
    .replace('rgb(', '')
    .replace(')', '')
    .split(',')
    .map((c) => parseFloat(c) / 255)

  // font size relative letter spacing
  const letterSpacing = (parseFloat(cs.letterSpacing) || 0) / parseFloat(cs.fontSize)
  const lineHeight = (parseFloat(cs.lineHeight) || 0) / parseFloat(cs.fontSize)

  const fontSize = parseFloat(cs.fontSize) * scaleMultiplier
  const textAlign = cs.textAlign

  useEffect(() => {
    if (material && overrideEmissive) {
      // @ts-ignore
      material.emissive.set(color)
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
  const maxWidth = scale ? scale[0] : size.width

  return (
    <group position={[-size.width / 2, 0, 0]}>
      <DreiText
        ref={meshRef}
        fontSize={fontSize}
        maxWidth={maxWidth}
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
        {...props}
      >
        {/* @ts-ignore */}
        <revealMaterial uniforms-u_height-value={size.height} uniforms-u_color-value={textColorRgb} />
        {children}
      </DreiText>
    </group>
  )
}

export default Text

const RevealMaterial = shaderMaterial(
  {
    u_height: 0,
    u_progress: 0,
    u_color: [0, 0, 0],
    // u_dataTexture: { value: null },
  },
  `
    varying vec2 v_uv;
    // uniform sampler2D u_dataTexture;
    uniform float u_height;
    uniform float u_progress;

    void main() {
      vec3 pos = position;
      pos.y -= u_progress * u_height;

      vec4 modelPosition = modelMatrix * vec4(pos, 1.0);

      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      gl_Position = projectedPosition;
      v_uv = uv;
    }
  `,
  `
    // uniform sampler2D u_dataTexture;
    varying vec2 v_uv;
    uniform vec3 color;
    uniform vec3 u_color;
    void main() {
      gl_FragColor = vec4(u_color, 1.0);
    }
  `,
)

RevealMaterial.key = uuid()

extend({ RevealMaterial })
