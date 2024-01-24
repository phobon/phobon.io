import { motion } from 'framer-motion'
import { css } from '@/design/css'
import useSWR from 'swr'

import SlideLink from '@/components/slide_link'
import Meta from '@/components/layout/meta'
import { Spacer } from '@/components/primitives/spacer'
import Project from '@/components/project'
import HeroHeader from '@/components/hero_header'
import Experience from '@/components/experience'
import ShowcaseGrid from '@/components/showcase_grid'
import FluidStudy from '@/components/fluid_study'

const fetcher = (url) => fetch(url).then((res) => res.json())

const ease = [0.33, 1, 0.68, 1]

const motionProps = {
  initial: 'initial',
  animate: 'visible',
}

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

const Index = ({ ...props }) => {
  const { projects, experiences, writing } = useData()

  return (
    <>
      <Meta />

      <div
        className={css({
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'subgrid',
          gridAutoRows: 'subgrid',
          gridRowGap: '$8',
          gridColumn: '1 / -1',
        })}
      >
        <HeroHeader>
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
        </HeroHeader>

        {writing && (
          <ShowcaseGrid
            id='writing'
            variants={{
              visible: {
                translateY: 0,
                opacity: 1,
                transition: {
                  duration: 0.75,
                  delay: 0.15,
                  ease,
                  staggerChildren: 0.25,
                },
              },
              initial: {
                translateY: 16,
                opacity: 0,
              },
            }}
            {...motionProps}
          >
            {writing.map(({ key, ...s }, index) => {
              const gridColumn = index % 2 === 0 ? '1 / span 4' : '4 / -1'
              return <FluidStudy {...s} key={key} style={{ gridColumn }} />
            })}
          </ShowcaseGrid>
        )}

        <Spacer />

        {experiences && (
          <motion.section
            className={css({
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'center',
              alignItems: 'flex-start',
              gap: {
                base: '$6',
                md: '$9',
              },
              gridColumn: '1 / -1',
            })}
            variants={{
              visible: {
                translateY: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                  delay: 0.3,
                  ease,
                },
              },
              initial: {
                opacity: 0,
                translateY: 16,
              },
            }}
            {...motionProps}
          >
            {experiences.map(({ key, ...e }) => (
              <span key={key}>
                <Experience {...e} />
                <Spacer />
              </span>
            ))}
          </motion.section>
        )}

        {projects && (
          <motion.section
            className={css({
              width: '100%',
              display: 'grid',
              gridTemplateColumns: {
                base: '1fr',
                md: 'repeat(2, 1fr)',
              },
              gridAutoRows: 'auto',
              alignSelf: 'center',
              gridGap: '$6',
              gridColumn: '1 / -1',
            })}
            variants={{
              visible: {
                translateY: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                  delay: 0.5,
                  ease,
                },
              },
              initial: {
                opacity: 0,
                translateY: 16,
              },
            }}
            {...motionProps}
          >
            {projects.map((p) => (
              <Project key={p.name} project={p} />
            ))}
          </motion.section>
        )}
      </div>
    </>
  )
}

export default Index
