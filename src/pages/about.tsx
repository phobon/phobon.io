import { motion } from 'framer-motion'

import Meta from '@/components/layout/meta'
import useSWR from 'swr'
import SlideLink from '@/components/slide_link'
import { Spacer } from '@/components/primitives/spacer'
import Experience from '@/components/experience'
import { Paragraph } from '@/components/markdown/paragraph'
import { Span } from '@/components/markdown/span'
import { css } from '@/design/css'

const fetcher = (url) => fetch(url).then((res) => res.json())

const ease = [0.33, 1, 0.68, 1]

const motionProps = {
  initial: 'initial',
  animate: 'visible',
}

const AboutMe = ({ ...props }) => {
  const { data, error } = useSWR('/api/experiences', fetcher)
  const experiences = data ? JSON.parse(data) : []
  return (
    <>
      <Meta description='about' />
      <>
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
          <span>I&apos;m Ben,&nbsp;</span>
          <span>a&nbsp;</span>
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

        <motion.section
          className={css({
            width: '100%',
            gridColumn: '1 / -1',
            display: 'flex',
            alignSelf: 'center',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: {
              base: '$6',
              md: '$9',
            },
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
          <Paragraph
            className={css({
              color: '$slate10',
              '&> * + *': {
                marginLeft: '$1',
              },
            })}
          >
            {`I've spent the last ${(new Date()?.getFullYear() || 2021) - 2005} years designing and building thoughtful,
          accessible digital experiences across a wide range of industries; from
          mining, to agriculture, to digital communications`}
          </Paragraph>

          <Paragraph
            className={css({
              color: '$slate10',
              '&> * + *': {
                marginLeft: '$1',
              },
            })}
          >
            Outside of what I do day-to-day - I love creative development and generative art; dogs of all shapes and
            sizes; and unleashing the competitive beast on the sporting field
          </Paragraph>

          <Paragraph
            className={css({
              color: '$slate10',
              mb: 0,
              '&> * + *': {
                marginLeft: '$1',
              },
            })}
          >
            <span>You&apos;ll often find me enjoying time with my</span>
            <span>
              <SlideLink href='https://www.instagram.com/thestudiophysio/'>amazing partner</SlideLink>,
            </span>
            <span>and my</span>
            <span>
              <SlideLink href='https://www.instagram.com/kodi_lab/'>best friend</SlideLink>;
            </span>
            <span>or</span>
            <Span
              className={css({
                color: 'inherit',
                textDecoration: 'line-through',
              })}
            >
              shitposting
            </Span>
            <span>online</span>
          </Paragraph>
          <Spacer />
          {experiences.map(({ key, ...e }) => (
            <span key={key}>
              <Experience {...e} />
              <Spacer />
            </span>
          ))}
        </motion.section>
      </>
    </>
  )
}

export default AboutMe
