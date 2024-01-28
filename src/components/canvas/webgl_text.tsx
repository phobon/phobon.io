import { MeshDistortMaterial, View } from '@react-three/drei'
import React, { MutableRefObject, ReactNode, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Text as DreiText } from '@react-three/drei'
import { css } from '@/design/css'
import { useFrame, useThree } from '@react-three/fiber'
import { Material } from 'three'

export type TextProps = {
  font?: string
  as?: any
} & React.HTMLAttributes<HTMLDivElement>

const useTracker = () => {
  const trackRef = useRef<HTMLElement>()
  const [rect, setRect] = useState<DOMRect>(null)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) {
      return
    }

    const trackRect = track.getBoundingClientRect()
    console.log(trackRect)
    setRect(trackRect)
  }, [setRect])

  return {
    trackRef,
    rect,
  }
}

const Text = ({ children, font, as: Tag = 'span' }: TextProps) => {
  const { trackRef, rect } = useTracker()

  return (
    <div
      className={css({
        position: 'relative',
      })}
      style={{
        height: rect?.height || 0,
        width: rect?.width || 0,
      }}
    >
      <Tag
        ref={trackRef}
        className={css({
          // opacity: 0,
          display: 'inline-block',
        })}
      >
        {children}
      </Tag>

      <View
        className={css({
          position: 'absolute',
          inset: 0,
        })}
      >
        {/* <Placeholder /> */}
        {/* <color attach='background' args={['purple']} /> */}
        <WebGLText textRef={trackRef} font={font} scale={[50, 50]}>
          {children}
        </WebGLText>
      </View>
    </div>
  )
}

// const Placeholder = () => {
//   const meshRef = useRef<any>()
//   const { size, viewport } = useThree()
//   console.log(size, viewport)

//   useFrame(({ invalidate }) => {
//     if (!meshRef.current) {
//       return
//     }

//     meshRef.current.rotation.x += 0.01
//     meshRef.current.rotation.y += 0.01
//   })

//   const s = viewport.width / 250
//   console.log(s)
//   const scale: any = [s, s, s]
//   return (
//     <mesh scale={scale} ref={meshRef}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshNormalMaterial />
//     </mesh>
//   )
// }

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

  console.log({
    fontSize,
    textAlign,
    lineHeight,
    letterSpacing,
    xOffset,
    yOffset,
    positionX: xOffset + fontSize * fontOffsetX,
  })

  return (
    <DreiText
      fontSize={fontSize}
      maxWidth={scale ? scale[0] : size.width}
      lineHeight={lineHeight}
      // @ts-ignore
      textAlign={textAlign}
      letterSpacing={letterSpacing}
      overflowWrap='break-word'
      font={font}
      // color={textColor}
      color='red'
      // @ts-ignore
      anchorX={textAlign}
      anchorY='top' // so text moves down if row breaks
      // @ts-ignore
      position={[xOffset + fontSize * fontOffsetX, yOffset + fontSize * fontOffsetY, 0]} // font specific
      // position={[0, 0, 0]}
      material={material}
      {...props}
    >
      {children}
    </DreiText>
  )
}

export default Text
