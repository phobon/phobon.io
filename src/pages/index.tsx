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
      <section
        className={cn(
          sectionStyles,
          css({
            height: '45vh',
            pt: '$12',
            gridTemplateRows: 'auto auto 1fr',
            gridRowGap: '$4',
            px: '$5',
          }),
        )}
      >
        <h1
          className={css({
            display: 'flex',
            justifyContent: 'flex-start',
            lineHeight: '$none',
            gridColumn: '1 / -1',
            width: '100%',
            fontSize: '$12',
          })}
        >
          <Text>Ben McCormick</Text>
          <Text>Creative Developer</Text>
        </h1>

        <div
          className={css({
            gridColumn: '1 / -1',
            height: 1,
            backgroundColor: '$slate4',
          })}
        ></div>

        <div
          className={css({
            gridColumn: '1 / span 2',
          })}
        >
          <Text as='p'>Perth, Western Australia</Text>
        </div>
      </section>

      <section
        className={cn(
          sectionStyles,
          css({
            placeItems: 'start',
            px: '$5',
          }),
        )}
      >
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'subgrid',
            placeItems: 'start',
            gridColumn: '1 / -1',
            gridRowGap: '$8',
          })}
        >
          {demoData.map(({ id, image, heading, content }) => {
            return (
              <section
                key={id}
                className={css({
                  gridColumn: 'span 3',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  gap: '$3',
                  width: '100%',
                })}
              >
                <Image
                  alt={heading}
                  src={image}
                  className={css({
                    width: '100%',
                    height: '45vh',
                  })}
                />
                <div
                  className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                  })}
                >
                  <Text as='h3' className={css({})}>
                    {heading}
                  </Text>
                  <Text
                    as='p'
                    className={css({
                      color: '$slate11',
                    })}
                  >
                    {content}
                  </Text>
                </div>
              </section>
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
          {/* <Text>Some other random bullshit.</Text> */}
        </h2>
      </section>
    </>
  )
}

const sectionStyles = css({
  width: '100%',
  display: 'grid',
  gridColumn: '1 / -1',
  gridTemplateColumns: 'subgrid',
})
