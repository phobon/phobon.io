import { css } from '@/design/css'
import { cn } from '@/utils/cn'
import { Link } from '@/utils/navigation_helpers'

import creativeProjects from '@/data/creative_projects.json'
import experiences from '@/data/experiences.json'
import allWriting from '@/data/all_writing.json'
import workProjects from '@/data/work_projects.json'
import now from '@/data/now.json'

import CreativeProject from '@/components/creative_project'
import SideStack from '@/components/side_stack'
import { anchorStyles } from '@/components/primitives/anchor'
import MiniProject from '@/components/mini_project'

export default function Page({ ...props }) {
  const filteredProjects = []

  let i = 0
  for (const project of creativeProjects) {
    const { active, ...rest } = project
    if (!active) {
      continue
    }

    i += 1
    filteredProjects.push({
      ...rest,
      index: new String(i).padStart(2, '0'),
    })
  }

  return (
    <>
      <section
        className={cn(
          sectionStyles,
          css({
            placeItems: 'start',
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
          {filteredProjects.map((project) => {
            const { key, index, description, ...rest } = project

            return (
              <li
                key={key}
                className={cn(
                  css({
                    display: 'grid',
                    gridTemplateColumns: 'subgrid',
                    width: '100%',
                    position: 'relative',
                    gridColumn: 'span 6',
                  }),
                )}
              >
                <CreativeProject className={css({})} index={index} {...rest}>
                  {description}
                </CreativeProject>
              </li>
            )
          })}
        </ul>
      </section>

      <section
        className={cn(
          sectionStyles,
          css({
            pt: {
              base: '$6',
              md: '$12',
              lg: '$12',
            },
            pb: {
              base: '$6',
              md: '$12',
              lg: '$12',
            },
            gridTemplateColumns: 'subgrid',
            gridTemplateRows: '1fr',
            gridRowGap: {
              base: '$6',
              md: '$4',
              lg: '$4',
            },
            placeItems: 'start',
          }),
        )}
      >
        <div
          className={css({
            position: 'relative',
            gridColumn: {
              base: '1 / -1',
              md: 'span 5',
              lg: 'span 7',
            },
            display: 'flex',
            flexDirection: 'column',
            fontSize: {
              base: '$5',
              md: '$7',
              lg: '$7',
            },
            gap: '$7',
            color: '$slate11',
          })}
        >
          <p>
            I am a design engineer focused on the entire frontend stack including React, WebGL development, interface
            and interaction design; as well as creative direction and animation.
          </p>

          <p>
            With over {`${new Date().getFullYear() - 2005}`} years of experience embedded across product teams, I thrive
            across disciplines - taking great pride in my ability to adapt; connecting and elevating teams I work with.
          </p>

          <p>
            I am adept working in startup, scaleup, traditional and remote environments. I approach my work with
            passion, enthusiasm, and a desire to bring every experience to the highest levels of quality. I try to be
            the best possible teammate, and love seeing and celebrating my colleagues&apos; successes.
          </p>
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
            fontSize: '$2',
          })}
        >
          <SideStack title='Now'>
            <li>
              <span
                className={css({
                  color: '$slate10',
                })}
              >
                {now.employ} - {now.title}
              </span>
            </li>
          </SideStack>

          <SideStack title='Previous Experience'>
            {experiences.map(({ key, employ, href, title }) => {
              return (
                <li key={key}>
                  <span
                    className={css({
                      color: '$slate10',
                    })}
                  >
                    {employ} - {title}
                  </span>
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
                    <a href={href} target='_blank' title={title} className={anchorStyles}>{`↱  ${title}`}</a>
                  ) : (
                    <Link href={href} title={title}>
                      <span
                        className={css({
                          color: '$slate10',
                        })}
                      >{`↱  ${title}`}</span>
                    </Link>
                  )}
                </li>
              )
            })}
          </SideStack>
        </div>
      </section>

      <section
        className={cn(
          css({
            pb: '$12',
            gridRowGap: '$5',
            fontSize: '$2',
          }),
          sectionStyles,
        )}
      >
        <h2>Projects</h2>
        <ul
          className={css({
            display: 'grid',
            gridTemplateColumns: 'subgrid',
            gridColumn: '1 / -1',
            borderTop: '1px solid',
            borderBottom: '1px solid',
            borderColor: '$slate3',

            '&> * + *': {
              borderTop: '1px solid',
              borderColor: '$slate3',
            },
          })}
        >
          {workProjects.map(({ key, href, title, description, index, client }) => {
            return (
              <MiniProject as='li' key={key} href={href} title={title} index={index} client={client}>
                {description}
              </MiniProject>
            )
          })}
        </ul>
      </section>
    </>
  )
}

const sectionStyles = css({
  width: '100%',
  display: 'grid',
  gridColumn: '1 / -1',
  gridTemplateColumns: 'subgrid',
  position: 'relative',
  px: {
    base: '$4',
    md: '$5',
    lg: '$5',
  },
})
