'use client'

import { css } from '@/design/css'
import { useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import InfiniteScroll from '@/components/infinite_scroll'
import ScrollSection from '@/components/infinite_scroll/scroll_section'
import FluidStudy from '@/components/fluid_study'

import { View, shaderMaterial } from '@react-three/drei'
import { ShaderMaterial } from 'three'
import { cn } from '@/helpers/cn'
import { gridStyles } from '@/components/layout/common'

import projects from '@/data/projects.json'
import experiences from '@/data/experiences.json'
import writing from '@/data/writing.json'

const Text = dynamic(() => import('@/components/canvas/webgl_text').then((mod) => mod), { ssr: false })
const Image = dynamic(() => import('@/components/canvas/webgl_image').then((mod) => mod), { ssr: false })

const CustomMaterial = new ShaderMaterial({
  uniforms: {},
  vertexShader: `
    varying vec2 v_uv;
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      v_uv = uv;
    }
  `,
  fragmentShader: `
    varying vec2 v_uv;
    void main() {
      gl_FragColor = vec4(v_uv, 0.0, 1.0); // Red color
    }
  `,
})

extend({ CustomMaterial })

const Placeholder = () => {
  const meshRef = useRef<THREE.Mesh>()
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
    }
  })
  return (
    <mesh scale={[500, 500, 500]} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export default function Page({ ...props }) {
  return (
    <InfiniteScroll
      className={cn(
        css({
          display: 'grid',
        }),
        gridStyles,
      )}
    >
      <ScrollSection className={sectionStyles}>
        <View
          className={css({
            width: '100%',
            height: '100%',
            gridColumn: 'span 3',
          })}
          track={undefined}
        >
          <Placeholder />
        </View>
        <View
          className={css({
            width: '100%',
            height: '100%',
            gridColumn: 'span 3',
          })}
          track={undefined}
        >
          <Placeholder />
        </View>
        <View
          className={css({
            width: '100%',
            height: '100%',
            gridColumn: 'span 3',
          })}
          track={undefined}
        >
          <Placeholder />
        </View>
        <View
          className={css({
            width: '100%',
            height: '100%',
            gridColumn: 'span 3',
          })}
          track={undefined}
        >
          <Placeholder />
        </View>

        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            lineHeight: '$none',
            gridColumn: '1 / -1',
          })}
        >
          <Text
            className={css({
              fontSize: '$14',
            })}
            material={CustomMaterial}
          >
            Ben McCormick
          </Text>
          <Text
            className={css({
              fontSize: '$14',
            })}
          >
            Creative Developer
          </Text>

          <Image
            src='phbn_grayscale.png'
            alt='test'
            className={css({
              width: 500,
              height: 500,
            })}
          />
        </div>
      </ScrollSection>

      {writing.map(({ key, ...s }, i) => {
        return (
          <ScrollSection key={key} className={sectionStyles}>
            <FluidStudy
              {...s}
              className={css({
                gridColumn: '1 / -1',
              })}
            />
          </ScrollSection>
        )
      })}
    </InfiniteScroll>
  )
}

const sectionStyles = css({
  height: '100dvh',
  width: '100%',
  display: 'grid',
  gridColumn: '1 / -1',
  gridTemplateColumns: 'subgrid',
})

const viewStyles = css({
  gridColumn: '1 / -1',
  inset: 0,
  position: 'absolute',
})
