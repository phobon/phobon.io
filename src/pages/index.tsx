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
            height: '25vh',
            gridTemplateRows: 'auto auto 1fr',
            gridRowGap: '$4',
            pt: '$11',
            px: '$5',
          }),
        )}
      >
        <h1
          className={css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            lineHeight: '$none',
            gridColumn: '1 / span 7',
            width: '100%',
            fontSize: '$10',
          })}
        >
          <Text>Ben McCormick is a creative developer based in Perth, Western Australia</Text>
          {/* <Text>Creative Developer</Text> */}
        </h1>

        {/* <div
          className={css({
            gridColumn: '1 / span 8',
            height: 1,
            backgroundColor: '$slate4',
          })}
        ></div> */}
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
            gridRowGap: '$5',
          })}
        >
          {demoData.map(({ id, image, heading, content }) => {
            return (
              <section
                key={id}
                className={css({
                  gridColumn: '1 / -1',
                  display: 'grid',
                  gridTemplateColumns: 'subgrid',
                  width: '100%',
                })}
              >
                <Image
                  alt={heading}
                  src={image}
                  className={css({
                    width: '100%',
                    height: '40vh',
                    gridColumn: 'span 8',
                  })}
                />
                <div
                  className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    gridColumn: 'span 4',
                    width: '100%',
                  })}
                >
                  <Text as='h2' className={css({})}>
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
    </>
  )
}

const sectionStyles = css({
  width: '100%',
  display: 'grid',
  gridColumn: '1 / -1',
  gridTemplateColumns: 'subgrid',
})
