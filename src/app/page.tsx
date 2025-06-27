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
    <section
      className={css({
        display: 'grid',
        gridTemplateColumns: 'subgrid',
        gridColumn: '1 / -1',
        gridRowGap: '$10',
        pt: '$5',
      })}
    >
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
              base: '$8',
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
                    gridColumn: { base: '1 / -1', lg: 'span 6' },
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
            gridTemplateColumns: 'subgrid',
            gridTemplateRows: { base: '1fr auto', lg: '1fr' },
            gridRowGap: {
              base: '$6',
              lg: '$4',
            },
            placeItems: 'start',
          }),
        )}
      >
        <p
          className={css({
            position: 'relative',
            gridColumn: {
              base: '1 / -1',
              md: '1 / 5',
              lg: 'span 6',
            },
            gridRow: '1 / -1',
            fontSize: {
              base: '$5',
              md: '$7',
              lg: '$7',
            },
            color: '$slate11',
            lineHeight: '$tight',
            textIndent: { base: 'calc((100% / 6) * 1)', md: 'calc((100% / 8) * 1)', lg: 'calc((100% / 12) * 1)' },
            textWrap: 'pretty',
          })}
        >
          I am a design engineer with over {`${new Date().getFullYear() - 2005}`} years of experience, focused on the
          entire frontend stack including React, WebGL development, interface and interaction design; as well as
          creative direction and animation.
        </p>

        <aside
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: { base: '$6', lg: '$8' },
            gridColumn: {
              base: '1 / -1',
              md: '5 / -1',
              lg: 'span 3',
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
        </aside>

        <aside
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '$8',
            gridColumn: {
              base: '1 / -1',
              md: '5 / -1',
              lg: 'span 3',
            },
            gridRow: {
              base: 'initial',
              md: '2 / span 1',
              lg: '1 / span 1',
            },
            fontSize: '$2',
          })}
        >
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
        </aside>
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
          {workProjects.map((p) => {
            const { key, description, ...rest } = p
            return (
              <MiniProject as='li' key={key} {...rest}>
                {description}
              </MiniProject>
            )
          })}
        </ul>
      </section>
    </section>
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
