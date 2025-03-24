'use client'

import { css } from '@/design/css'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import { cn } from '@/utils/cn'
import { motion, useSpring } from 'motion/react'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import dynamic from 'next/dynamic'

const Video = dynamic(() => import('@/components/canvas/enhancements/webgl_video'), { ssr: false })
const Image = dynamic(() => import('@/components/canvas/enhancements/webgl_image'), { ssr: false })

export const CreativeProject = forwardRef<any, any>(
  (
    {
      className,
      index,
      imageSrc,
      videoSrc,
      title,
      children,
      status,
      imageDimensions,
      videoDimensions,
      priority,
      href,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLAnchorElement>(undefined)
    useImperativeHandle(ref, () => containerRef.current)

    const progress = useSpring(0, { duration: 1, bounce: 0 })

    return (
      <motion.a
        className={cn(
          css({
            display: 'grid',
            gridTemplateColumns: 'subgrid',
            width: '100%',
            position: 'relative',
            gridColumn: '1 / -1',
            gridTemplateRows: '1fr',
            gridRowGap: {
              base: '$3',
              md: '$3',
              lg: '0',
            },
            overflow: 'clip',
          }),
          className,
        )}
        href={href}
        target='_blank'
        initial='hidden'
        whileHover='hovered'
        onPointerOver={(e) => {
          progress.set(1)
        }}
        onPointerLeave={(e) => {
          progress.set(0)
        }}
        ref={containerRef}
        {...props}
      >
        <motion.section
          className={css({
            width: '100%',
            gridArea: '1 / 1 / -1 / -1',
          })}
        >
          {videoSrc ? (
            <Video
              alt={title}
              fallback={imageSrc}
              src={videoSrc}
              progress={progress}
              width={imageDimensions[0]}
              height={imageDimensions[1]}
              videoDimensions={videoDimensions}
              priority={priority}
            />
          ) : (
            <Image
              alt={title}
              src={imageSrc}
              progress={progress}
              width={imageDimensions[0]}
              height={imageDimensions[1]}
              priority={priority}
            />
          )}
        </motion.section>

        <motion.section
          className={css({
            gridArea: '1 / 1 / -1 / -1',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            placeItems: 'end',
            zIndex: 1,
            p: '$5',
          })}
          variants={{
            hovered: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
                type: 'spring',
                bounce: 0,
              },
            },
            hidden: {
              y: '10%',
              opacity: 0,
              transition: {
                duration: 0.5,
                type: 'spring',
                bounce: 0,
              },
            },
          }}
        >
          <h2
            className={css({
              color: '$slate1',
              fontSize: '$8',
              lineHeight: '$none',
            })}
          >
            {title}
          </h2>
          <div
            className={css({
              pointerEvents: 'none',
            })}
          >
            <ArrowRightIcon color='#fff' width={32} height={32} />
          </div>
        </motion.section>
      </motion.a>
    )
  },
)
