'use client'

import { css } from '@/design/css'
import { cn } from '@/utils/cn'
import { motion } from 'motion/react'
import { CreativeProject } from './creative_project'
import { Fragment } from 'react'

export const CreativeProjectList = ({ creativeProjects, className, ...props }: any) => {
  return (
    <motion.ul
      className={cn(
        css({
          display: 'grid',
          gridTemplateColumns: 'subgrid',
          placeItems: 'start',
          gridColumn: '1 / -1',
          gridRowGap: {
            base: '$6',
            md: '$6',
            lg: '$5',
          },
        }),
        className,
      )}
      initial='hidden'
      animate='visible'
      variants={{
        hidden: {
          opacity: 1,
          transition: {
            staggerChildren: 0.25,
            delayChildren: 1,
          },
        },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 1,
          },
        },
      }}
    >
      {creativeProjects.map(
        (
          {
            key,
            imageSrc,
            videoSrc,
            title,
            description,
            status,
            imageDimensions,
            videoDimensions,
            priority,
            href,
            hidden,
          },
          index,
        ) => {
          const projectIndex = new String(index + 1).padStart(2, '0')

          if (hidden) {
            return null
          }

          return (
            <motion.li
              key={key}
              className={css({
                display: 'grid',
                gridTemplateColumns: 'subgrid',
                gridColumn: {
                  base: '1 / -1',
                  md: 'span 3',
                  lg: 'span 6',
                },
                width: '100%',
                height: {
                  base: '40dvh',
                },
                position: 'relative',
                overflow: 'clip',
              })}
            >
              <CreativeProject
                index={projectIndex}
                imageSrc={imageSrc}
                videoSrc={videoSrc}
                title={title}
                status={status}
                imageDimensions={imageDimensions}
                videoDimensions={videoDimensions}
                priority={priority}
                href={href}
              >
                {description}
              </CreativeProject>

              <motion.aside
                className={css({
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: '$purple12',
                  zIndex: 1,
                })}
                variants={{
                  hidden: {
                    y: 0,
                    transition: {
                      duration: 0.5,
                      type: 'spring',
                      bounce: 0,
                    },
                  },
                  visible: {
                    y: '100%',
                    transition: {
                      duration: 0.5,
                      type: 'spring',
                      bounce: 0,
                    },
                  },
                }}
              ></motion.aside>
            </motion.li>
          )
        },
      )}
    </motion.ul>
  )
}
