'use client'

import { css } from '@/design/css'
import dynamic from 'next/dynamic'
import { cn } from '@/helpers/cn'

import projects from '@/data/projects.json'
import experiences from '@/data/experiences.json'
import writing from '@/data/writing.json'
import demoData from '@/data/demo_data.json'

const Text = dynamic(() => import('@/components/canvas/webgl_text').then((mod) => mod), { ssr: false })
const Image = dynamic(() => import('@/components/canvas/webgl_image').then((mod) => mod), { ssr: false })

export default function Page({ ...props }) {
  return (
    <>
      <Hero />

      <section
        className={cn(
          sectionStyles,
          css({
            height: '150vh',
            placeItems: 'start',
          }),
        )}
      >
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'subgrid',
            placeItems: 'start',
            gridColumn: '2 / -2',
            gridRowGap: '$3',
          })}
        >
          {demoData.map(({ id, image, heading, content }) => {
            return (
              <Image
                key={id}
                alt={heading}
                src={image}
                className={css({
                  gridColumn: 'span 5',
                  width: '100%',
                  height: 'auto',
                })}
              />
            )
          })}
        </div>
      </section>
      <section
        className={cn(
          sectionStyles,
          css({
            placeItems: 'start',
            height: '100vh',
          }),
        )}
      >
        <h2
          className={css({
            display: 'flex',
            lineHeight: '$none',
            gridColumn: '2 / -2',
            fontSize: '$5',
            width: '100%',
          })}
        >
          <Text>Some other random bullshit.</Text>
        </h2>
      </section>
      <Hero />
    </>
  )
}

const Hero = () => {
  return (
    <section
      className={cn(
        sectionStyles,
        css({
          height: '100vh',
        }),
      )}
    >
      <h1
        className={css({
          display: 'flex',
          flexDirection: 'column',
          lineHeight: '$none',
          gridColumn: '2 / -1',
          fontSize: '$11',
        })}
      >
        <Text>Ben McCormick.</Text>
        <Text>Creative Developer</Text>
      </h1>
    </section>
  )
}

const sectionStyles = css({
  width: '100%',
  display: 'grid',
  gridColumn: '1 / -1',
  gridTemplateColumns: 'subgrid',
})
