'use client'

import { css } from '@/design/css'
import { useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import InfiniteScroll from '@/components/infinite_scroll'
import ScrollSection from '@/components/infinite_scroll/scroll_section'
import { slate } from '@radix-ui/colors'
import FluidStudy from '@/components/fluid_study'

import projects from '@/data/projects.json'
import experiences from '@/data/experiences.json'
import writing from '@/data/writing.json'
import { View, shaderMaterial } from '@react-three/drei'
import { ShaderMaterial } from 'three'

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
    <InfiniteScroll>
      <ScrollSection className={sectionStyles}>
        <View
          className={css({
            position: 'absolute',
            inset: 0,
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

        {/* <h1
          className={css({
            width: '100%',
            color: '$slate12',
            fontWeight: 'light',
            gridColumn: '1 / -1',
            fontSize: {
              base: '$9',
              md: '$11',
            },
            lineHeight: {
              base: '$2',
              md: '$1',
            },
            '&> span': {
              display: 'inline-table',
            },
          })}
        >
          <span>I&apos;m&nbsp;</span>
          <span>
            <SlideLink href='/about'>Ben</SlideLink>
          </span>
          <span>, a&nbsp;</span>
          <span
            className={css({
              color: '$purple10',
            })}
          >
            developer&nbsp;
          </span>
          <span>&&nbsp;</span>
          <span
            className={css({
              color: '$purple10',
            })}
          >
            designer&nbsp;
          </span>
          <span>based in Perth&nbsp;</span>
        </h1> */}
      </ScrollSection>

      {writing.map(({ key, ...s }, i) => {
        return (
          <ScrollSection key={key} className={sectionStyles} style={{ backgroundColor: slate[`slate${i + 4}`] }}>
            <FluidStudy {...s} />
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
  position: 'relative',
})

const viewStyles = css({
  gridColumn: '1 / -1',
  inset: 0,
  position: 'absolute',
})
