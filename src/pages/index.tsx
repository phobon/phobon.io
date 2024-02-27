'use client'

import { css } from '@/design/css'
import dynamic from 'next/dynamic'
import { cn } from '@/helpers/cn'

import projects from '@/data/projects.json'
import experiences from '@/data/experiences.json'
import writing from '@/data/all_writing.json'
import { Link } from '@/helpers/navigation_helpers'

const Text = dynamic(() => import('@/components/canvas/webgl_text').then((mod) => mod), { ssr: false })
const Image = dynamic(() => import('@/components/canvas/webgl_image').then((mod) => mod), { ssr: false })
const Video = dynamic(() => import('@/components/canvas/webgl_video').then((mod) => mod), { ssr: false })

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
        </h1>
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
          {projects.map(({ id, imageSrc, videoSrc, title, description }) => {
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
                {videoSrc ? (
                  <Video
                    alt={name}
                    fallback={imageSrc}
                    src={videoSrc}
                    className={css({
                      width: '100%',
                      height: '40vh',
                      gridColumn: 'span 8',
                    })}
                  />
                ) : (
                  <Image
                    alt={name}
                    src={imageSrc}
                    className={css({
                      width: '100%',
                      height: '40vh',
                      gridColumn: 'span 8',
                    })}
                  />
                )}
                <div
                  className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    gridColumn: 'span 3',
                    width: '100%',
                  })}
                >
                  <Text
                    as='h2'
                    className={css({
                      color: '#000',
                    })}
                  >
                    {title}
                  </Text>
                  <Text as='p' className={css({})}>
                    {description}
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
            height: '100dvh',
            pt: '$12',
            gridTemplateRows: '1fr',
            gridRowGap: '$4',
            px: '$5',
            placeItems: 'start',
          }),
        )}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '$8',
            gridColumn: '9 / span 3',
            gridRow: '1 / span 1',
          })}
        >
          <ul
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '$1',
            })}
          >
            <li
              className={css({
                width: '100%',
              })}
            >
              <h2
                className={css({
                  color: '#000',
                })}
              >
                <Text>Experience</Text>
              </h2>
            </li>

            {experiences.map(({ key, employ, href, title }) => {
              return (
                <li key={key}>
                  <h3 className={css({})}>
                    <Text>
                      {employ} - {title}
                    </Text>
                  </h3>
                </li>
              )
            })}
          </ul>

          <ul
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '$1',
            })}
          >
            <li
              className={css({
                width: '100%',
              })}
            >
              <h2
                className={css({
                  color: '#000',
                })}
              >
                <Text>Writing</Text>
              </h2>
            </li>

            {writing.map(({ key, title, href, published }) => {
              if (!published) {
                return null
              }

              return (
                <li key={key}>
                  <Link href={href}>
                    <Text>{`↱  ${title}`}</Text>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div
          className={css({
            gridColumn: 'span 7',
            display: 'flex',
            flexDirection: 'column',
            fontSize: '$8',
            gap: '$8',
          })}
        >
          <Text as='p'>
            I am a creative developer focused on the entire frontend stack including React, WebGL development, interface
            and interaction design; as well as creative direction and animation.
          </Text>

          <Text as='p'>
            With over 17 years of experience embedded across product teams, I thrive across disciplines - taking great
            pride in my ability to adapt; connecting and elevating teams I work with.
          </Text>

          <Text as='p'>
            I am adept working in startup, scaleup, traditional and remote environments. I approach my work with
            passion, enthusiasm, and a desire to bring every experience to the highest levels of quality. I try to be
            the best possible teammate, and love seeing and celebrating my colleagues&apos; successes.
          </Text>
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
