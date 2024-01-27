'use client'

import { css } from '@/design/css'
import { useRef } from 'react'
// import { View } from '@/components/canvas/view'
import { useFrame } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import InfiniteScroll from '@/components/infinite_scroll'
import ScrollSection from '@/components/infinite_scroll/scroll_section'
// import WebGLText from '@/components/webgl_text'
import { slate } from '@radix-ui/colors'
import SlideLink from '@/components/slide_link'
import useSWR from 'swr'
import FluidStudy from '@/components/fluid_study'

const fetcher = (url) => fetch(url).then((res) => res.json())

const View = dynamic(() => import('@react-three/drei').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg
        style={{ width: 40, height: 40 }}
        className='-ml-1 mr-3 h-5 w-5 animate-spin text-black'
        fill='none'
        viewBox='0 0 24 24'
      >
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})

const WebGLText = dynamic(() => import('@/components/webgl_text').then((mod) => mod), { ssr: false })

const useData = () => {
  const { data: projectsData, error: projectsError } = useSWR('/api/projects', fetcher)
  const { data: experiencesData, error: experiencesError } = useSWR('/api/experiences', fetcher)
  const { data: writingData, error: writingError } = useSWR('/api/writing', fetcher)

  const projects = projectsData ? JSON.parse(projectsData) : []
  const experiences = experiencesData ? JSON.parse(experiencesData) : []
  const writing = writingData ? JSON.parse(writingData) : []

  return {
    projects,
    experiences,
    writing,
  }
}

export default function Page() {
  const { projects, experiences, writing } = useData()
  return (
    <InfiniteScroll>
      <ScrollSection index={1} className={sectionStyles} style={{ backgroundColor: slate.slate3 }}>
        <h1
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
        </h1>
      </ScrollSection>

      {writing.map(({ key, ...s }, i) => {
        return (
          <ScrollSection
            key={key}
            index={2 + i}
            className={sectionStyles}
            style={{ backgroundColor: slate[`slate${i + 4}`] }}
          >
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
