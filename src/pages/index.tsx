'use client'

import { css } from '@/design/css'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import InfiniteScroll from '@/components/infinite_scroll'
import ScrollSection from '@/components/infinite_scroll/scroll_section'
import { slate } from '@radix-ui/colors'
import FluidStudy from '@/components/fluid_study'

import projects from '@/data/projects.json'
import experiences from '@/data/experiences.json'
import writing from '@/data/writing.json'

const Text = dynamic(() => import('@/components/canvas/webgl_text').then((mod) => mod), { ssr: false })
const Image = dynamic(() => import('@/components/canvas/webgl_image').then((mod) => mod), { ssr: false })

export default function Page({ ...props }) {
  return (
    <InfiniteScroll>
      <ScrollSection className={sectionStyles}>
        <div
          className={css({
            ml: '$10',
          })}
        >
          <Text
            className={css({
              fontSize: '$10',
            })}
          >
            ASDF
          </Text>
        </div>

        <Text>ASDF2</Text>

        <Image
          src='phbn_grayscale.png'
          alt='test'
          className={css({
            width: 500,
            height: 500,
          })}
        />
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

const Placeholder = ({ color }) => {
  const meshRef = useRef<any>()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
    }
  })
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} />
    </mesh>
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
