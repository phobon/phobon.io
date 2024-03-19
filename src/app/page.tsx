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
import { anchorStyles } from '@/components/primitives/anchor'

export default function Page({ ...props }) {
  return (
    <>
      <section
        className={cn(
          sectionStyles,
          css({
            height: {
              base: '35vh',
              md: '30vh',
              lg: '30vh',
            },
            gridTemplateRows: '1fr',
            gridRowGap: '$4',
            px: '$5',
            pb: {
              base: '$7',
              md: '$8',
              lg: '$10',
            },
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
            gridColumn: {
              base: '1 / -1',
              md: '1 / -1',
              lg: '1 / span 7',
            },
            width: '100%',
            fontSize: {
              base: '$8',
              md: '$10',
              lg: '$10',
            },
          })}
          enhance
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
            gridRowGap: {
              base: '$6',
              md: '$6',
              lg: '$5',
            },
          })}
        >
          {creativeProjects.map(
            (
              { key, imageSrc, videoSrc, title, description, status, imageDimensions, videoDimensions, priority },
              index,
            ) => {
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
                  imageDimensions={imageDimensions}
                  videoDimensions={videoDimensions}
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
            height: {
              base: 'initial',
              md: '125dvh',
              lg: '125dvh',
            },
            pt: {
              base: '$6',
              md: '$12',
              lg: '$12',
            },
            pb: {
              base: '$6',
              md: '0',
              lg: '0',
            },
            gridTemplateColumns: 'subgrid',
            gridTemplateRows: '1fr',
            gridRowGap: {
              base: '$6',
              md: '$4',
              lg: '$4',
            },
            px: '$5',
            placeItems: 'start',
          }),
        )}
      >
        <div
          className={css({
            gridColumn: {
              base: '1 / -1',
              md: 'span 5',
              lg: 'span 7',
            },
            display: 'flex',
            flexDirection: 'column',
            fontSize: {
              base: '$6',
              md: '$8',
              lg: '$8',
            },
            gap: '$8',
          })}
        >
          <Text as='p' enhance>
            I am a creative developer focused on the entire frontend stack including React, WebGL development, interface
            and interaction design; as well as creative direction and animation.
          </Text>

          <Text as='p' enhance>
            With over {`${new Date().getFullYear() - 2005}`} years of experience embedded across product teams, I thrive
            across disciplines - taking great pride in my ability to adapt; connecting and elevating teams I work with.
          </Text>

          <Text as='p' enhance>
            I am adept working in startup, scaleup, traditional and remote environments. I approach my work with
            passion, enthusiasm, and a desire to bring every experience to the highest levels of quality. I try to be
            the best possible teammate, and love seeing and celebrating my colleagues&apos; successes.
          </Text>
        </div>

        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '$8',
            gridColumn: {
              base: '1 / -1',
              md: '6 / -1',
              lg: '9 / -1',
            },
            gridRow: {
              base: 'initial',
              md: '1 / span 1',
              lg: '1 / span 1',
            },
          })}
        >
          <SideStack title='Projects'>
            {workProjects.map(({ key, href, title }) => {
              return (
                <li key={key}>
                  <Text
                    as='a'
                    href={href}
                    target='_blank'
                    title={title}
                    textStyles={anchorStyles}
                  >{`↱  ${title}`}</Text>
                </li>
              )
            })}
          </SideStack>

          <SideStack title='Experience'>
            {experiences.map(({ key, employ, href, title }) => {
              return (
                <li key={key}>
                  <Text
                    className={css({
                      color: '$slate10',
                    })}
                  >
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
                    <Text
                      as='a'
                      href={href}
                      target='_blank'
                      title={title}
                      textStyles={anchorStyles}
                    >{`↱  ${title}`}</Text>
                  ) : (
                    <Link href={href} title={title}>
                      <Text
                        className={css({
                          color: '$slate10',
                        })}
                      >{`↱  ${title}`}</Text>
                    </Link>
                  )}
                </li>
              )
            })}
          </SideStack>
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
