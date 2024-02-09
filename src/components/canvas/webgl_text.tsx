import { View } from '@react-three/drei'
import React, { MutableRefObject, ReactNode, useEffect, useMemo, useRef } from 'react'
import { Text as DreiText } from '@react-three/drei'
import { css } from '@/design/css'
import { Vector3, extend, useFrame, useThree } from '@react-three/fiber'
import { Material } from 'three'
import { PerspectiveCamera } from '@/helpers/perspective_camera'
import { cn } from '@/helpers/cn'
import { useTracker } from '@/helpers/use_tracker'
import { MotionValue, useMotionValueEvent } from 'framer-motion'
import * as THREE from 'three'

import { useGSAP } from '@gsap/react'

export type TextProps = {
  font?: string
  as?: any
  testIntersection?: boolean
} & Partial<Omit<WebGLTextProps, 'textRef' | 'children' | 'font' | 'scaleMultiplier'>> &
  React.HTMLAttributes<HTMLDivElement>

const Text = ({ className, children, font, as: Tag = 'span', testIntersection = false, ...props }: TextProps) => {
  const { trackRef, intersecting } = useTracker()

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
            opacity: 0,
            display: 'inline-block',
            // visibility: 'hidden',
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
        <WebGLText textRef={trackRef} font={font} intersecting={intersecting} {...props}>
          {children}
        </WebGLText>
      </View>
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
  intersecting?: MotionValue<boolean>
  testIntersection?: boolean
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
  intersecting,
  testIntersection,
  ...props
}: WebGLTextProps) => {
  const { size } = useThree()
  const meshRef = useRef<any>()

  useMotionValueEvent(intersecting, 'change', (latest) => {
    // if (!testIntersection) {
    //   return
    // }

    if (!meshRef.current) {
      return
    }
    console.log(latest)

    meshRef.current.material.uniforms.u_progress.value = latest
  })

  // console.log(size)

  // const dimensions = (children as string)?.length
  // useEffect(() => {
  //   const regenerateDataTexture = () => {
  //     // Populate data texture with initial values
  //     const data = new Float32Array(4 * dimensions)
  //     const step = 1 / dimensions
  //     let value = 0
  //     for (let stride = 0; stride < dimensions; stride++) {
  //       const index = 4 * stride
  //       console.log(value)
  //       data[index] = value
  //       data[index + 1] = value
  //       data[index + 2] = value
  //       data[index + 3] = value

  //       value += step
  //     }
  //     const dataTexture = new THREE.DataTexture(data, dimensions, 1, THREE.RGBAFormat, THREE.FloatType)
  //     dataTexture.minFilter = dataTexture.magFilter = THREE.NearestFilter
  //     dataTexture.needsUpdate = true

  //     meshRef.current.material.uniforms.u_dataTexture.value = dataTexture
  //     meshRef.current.material.uniforms.u_dataTexture.value.needsUpdate = true
  //   }

  //   window.addEventListener('resize', regenerateDataTexture)
  //   regenerateDataTexture()

  //   return () => {
  //     window.removeEventListener('resize', regenerateDataTexture)
  //   }
  // }, [dimensions])

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
        material={RevealMaterial}
        material-uniforms-u_height-value={size.height}
        {...props}
      >
        {children}
      </DreiText>
    </group>
  )
}

export default Text

const RevealMaterial = new THREE.ShaderMaterial({
  uniforms: {
    u_height: { value: 0 },
    u_progress: { value: 0 },
    // u_dataTexture: { value: null },
  },
  vertexShader: `
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
  fragmentShader: `
    // uniform sampler2D u_dataTexture;
    varying vec2 v_uv;
    uniform vec3 color;
    void main() {
      gl_FragColor = vec4(color, 1.0);
    }
  `,
})
