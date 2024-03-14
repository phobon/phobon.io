// 'use client'

import { css } from '@/design/css'
import { cn } from '@/helpers/cn'
import { Link } from '@/helpers/navigation_helpers'

import creativeProjects from '@/data/creative_projects.json'
import experiences from '@/data/experiences.json'
import allWriting from '@/data/all_writing.json'
import workProjects from '@/data/work_projects.json'

import Text from '@/components/canvas/webgl_text'
import CreativeProject from '@/components/creative_project'
import SideStack from '@/components/side_stack'

// const Text = dynamic(() => import('@/components/canvas/webgl_text').then((mod) => mod), { ssr: false })
// const CreativeProject = dynamic(() => import('@/components/creative_project').then((mod) => mod), { ssr: false })
// const SideStack = dynamic(() => import('@/components/side_stack').then((mod) => mod), { ssr: false })

export default function Page({ ...props }) {
  return (
    <>
      <section
        className={cn(
          sectionStyles,
          css({
            height: '30vh',
            gridTemplateRows: '1fr',
            gridRowGap: '$4',
            px: '$5',
            pb: '$10',
            alignItems: 'end',
            justifyContent: 'end',
          }),
        )}
      >
        <Text
          as='h1'
          className={css({
            justifyContent: 'flex-start',
            lineHeight: '$none',
            gridColumn: '1 / span 7',
            width: '100%',
            fontSize: '$10',
          })}
        >
          Ben McCormick is a creative developer based in Perth, Western Australia
        </Text>
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
        <ul
          className={css({
            display: 'grid',
            gridTemplateColumns: 'subgrid',
            placeItems: 'start',
            gridColumn: '1 / -1',
            gridRowGap: '$5',
          })}
        >
          {creativeProjects.map(
            ({ key, imageSrc, videoSrc, title, description, status, width, height, priority }, index) => {
              const projectIndex = new String(index + 1).padStart(2, '0')
              return (
                <CreativeProject
                  key={key}
                  className={css({
                    gridColumn: '1 / -1',
                  })}
                  index={projectIndex}
                  imageSrc={imageSrc}
                  videoSrc={videoSrc}
                  title={title}
                  status={status}
                  width={width}
                  height={height}
                  priority={priority}
                >
                  {description}
                </CreativeProject>
              )
            },
          )}
        </ul>
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
          <SideStack title='Projects'>
            {workProjects.map(({ key, href, title }) => {
              return (
                <li key={key}>
                  <Text as='a' href={href} target='_blank' title={title}>{`↱  ${title}`}</Text>
                </li>
              )
            })}
          </SideStack>

          <SideStack title='Experience'>
            {experiences.map(({ key, employ, href, title }) => {
              return (
                <li key={key}>
                  <Text>
                    {employ} - {title}
                  </Text>
                </li>
              )
            })}
          </SideStack>

          <SideStack title='Writing'>
            {allWriting.map(({ key, title, href, published, external }) => {
              if (!published) {
                return null
              }

              return (
                <li key={key}>
                  {external ? (
                    <Text as='a' href={href} target='_blank' title={title}>{`↱  ${title}`}</Text>
                  ) : (
                    <Link href={href} title={title}>
                      <Text>{`↱  ${title}`}</Text>
                    </Link>
                  )}
                </li>
              )
            })}
          </SideStack>
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
            With over {`${new Date().getFullYear() - 2005}`} years of experience embedded across product teams, I thrive
            across disciplines - taking great pride in my ability to adapt; connecting and elevating teams I work with.
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