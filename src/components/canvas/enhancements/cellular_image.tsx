'use client'

import * as THREE from 'three'
import { Color, extend, useFrame, useThree } from '@react-three/fiber'
import { shaderMaterial, useTexture } from '@react-three/drei'
import { ForwardRefComponent } from '@react-three/drei/helpers/ts-utils'
import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, type JSX } from 'react'

export type CellularImageProps = Omit<JSX.IntrinsicElements['mesh'], 'scale'> & {
  segments?: number
  scale?: number | [number, number]
  color?: Color
  zoom?: number
  radius?: number
  grayscale?: number
  toneMapped?: boolean
  transparent?: boolean
  opacity?: number
  side?: THREE.Side
  imageBounds?: [number, number]
} & ({ texture: THREE.Texture; url?: never } | { texture?: never; url: string }) // {texture: THREE.Texture} XOR {url: string}

type CellularImageMaterialType = JSX.IntrinsicElements['shaderMaterial'] & {
  scale?: number[]
  imageBounds?: number[]
  radius?: number
  resolution?: number
  color?: Color
  map: THREE.Texture
  zoom?: number
  grayscale?: number
  u_noise?: THREE.Texture
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // @ts-ignore
      cellularImageMaterial: CellularImageMaterialType
    }
  }
}

const ImageMaterial = shaderMaterial(
  {
    u_time: 0,
    color: new THREE.Color('white'),
    scale: new THREE.Vector2(1, 1),
    imageBounds: new THREE.Vector2(1, 1),
    resolution: 1024,
    map: null,
    u_noise: null,
    u_progress: 0,
    zoom: 1,
    radius: 0,
    grayscale: 0,
    opacity: 1,
  },
  `
  uniform float u_time;
  uniform sampler2D u_noise;
  uniform float u_progress;

  varying vec2 v_uv;
  varying vec2 v_pos;

  const float PI = 3.14159265;

  void main() {
    vec3 localSpacePosition = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(localSpacePosition, 1.0);

    v_uv = uv;
    v_pos = localSpacePosition.xy;
  }
`,
  `
  varying vec2 v_uv;
  varying vec2 v_pos;

  uniform vec2 scale;

  uniform vec2 imageBounds;
  uniform float resolution;

  uniform vec3 color;

  uniform sampler2D map;
  uniform sampler2D u_noise;

  uniform float radius;
  uniform float zoom;
  uniform float grayscale;
  uniform float opacity;
  uniform float u_progress;

  vec3 correctGamma(vec3 color) {
    return pow(color, vec3(1.0 / 1.5));
  }

  const vec3 luma = vec3(.299, 0.587, 0.114);

  vec4 toGrayscale(vec4 color, float intensity) {
    return vec4(mix(color.rgb, vec3(dot(color.rgb, luma)), intensity), color.a);
  }

  vec2 aspect(vec2 size) {
    return size / min(size.x, size.y);
  }

  vec3 chromaticAbberation(sampler2D tex, vec2 uv, float progress) {
    float factor = 0.075;
    float r = texture(tex, uv - vec2(factor, factor) * progress).r;
    float g = texture(tex, uv - vec2(factor, factor) * progress).g;
    float b = texture(tex, uv + vec2(factor, 0.0) * progress).b;
    vec3 caColor = vec3(r, g, b);
    return caColor;
  }
  
  const float PI = 3.14159265;

  void main() {
    vec2 s = aspect(scale);
    vec2 i = aspect(imageBounds);
    float rs = s.x / s.y;
    float ri = i.x / i.y;
    vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
    vec2 uv = v_uv * s / new + offset;
    vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5);

    vec2 res = vec2(scale * resolution);
    vec2 halfRes = 0.5 * res;

    vec2 resolution = vec2(48.0, 18.0);
    vec2 pixelUv = floor(uv * resolution) / resolution;
    float n = texture(u_noise, pixelUv).r;
    n = pow(n, 0.5);
    float caProgress = smoothstep(n, 0.0, u_progress);
    vec2 finalUv = mix(uv, pixelUv, u_progress);
    float alpha1 = smoothstep(0.0, n, u_progress * 0.75);
    float alpha2 = smoothstep(0.0, n, u_progress * 1.5);
    float alpha = step(n, u_progress * 1.5);

    vec4 finalColor = toGrayscale(texture2D(map, zUv) * vec4(color, opacity), grayscale);

    vec3 texel = chromaticAbberation(map, zUv, 1.0 - alpha1);
    texel = mix(correctGamma(texel), texel, alpha1);

    if (alpha == 1.0) {
      finalColor.rgb = texel;
    }
    gl_FragColor = finalColor;
    
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,
)
extend({ CellularImageMaterial: ImageMaterial })

export const CellularImage: ForwardRefComponent<Omit<CellularImageProps, 'url'>, THREE.Mesh> = forwardRef(
  (
    {
      children,
      color,
      segments = 1,
      scale = 1,
      zoom = 1,
      grayscale = 0,
      opacity = 1,
      radius = 0,
      texture,
      toneMapped,
      transparent,
      side,
      imageBounds,
      ...props
    }: Omit<CellularImageProps, 'url'>,
    ref: React.ForwardedRef<THREE.Mesh>,
  ) => {
    const meshRef = useRef<THREE.Mesh>(null!)
    useImperativeHandle(ref, () => meshRef.current)

    // Image and plane bounds
    const size = useThree((state) => state.size)
    const planeBounds = Array.isArray(scale) ? [scale[0], scale[1]] : [scale, scale]
    const resolution = Math.max(size.width, size.height)

    useLayoutEffect(() => {
      const mesh = meshRef.current
      if (!mesh) {
        return
      }

      // Support arbitrary plane geometries (for instance with rounded corners)
      // @ts-ignore
      if (mesh.geometry.parameters) {
        // @ts-ignore
        const w = planeBounds[0] * mesh.geometry.parameters.width
        // @ts-ignore
        const h = planeBounds[1] * mesh.geometry.parameters.height

        // @ts-ignore
        mesh.material.uniforms.scale.value.set(w, h)
      }
    }, [])

    const perlin = useTexture('/images/perlin.png', (t) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping
    })

    return (
      <mesh ref={meshRef} scale={Array.isArray(scale) ? [...scale, 1] : scale} {...props}>
        <planeGeometry args={[1, 1, segments, segments]} />
        {/* @ts-ignore */}
        <cellularImageMaterial
          color={color}
          map={texture!}
          zoom={zoom}
          grayscale={grayscale}
          opacity={opacity}
          scale={planeBounds}
          imageBounds={imageBounds}
          resolution={resolution}
          radius={radius}
          toneMapped={toneMapped}
          transparent={transparent}
          side={side}
          key={ImageMaterial.key}
          // @ts-ignore
          u_noise={perlin}
          // wireframe
        />
        {children}
      </mesh>
    )
  },
)
