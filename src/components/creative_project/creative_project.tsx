'use client'

import { css } from '@/design/css'

import Video from '../canvas/webgl_video'
import Image from '../canvas/webgl_image'
import Text from '../canvas/webgl_text'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { cn } from '@/helpers/cn'
import { Stinger } from './stinger'
import { animate, useMotionValue, useSpring } from 'framer-motion'

export const CreativeProject = forwardRef<any, any>(
  ({ className, index, imageSrc, videoSrc, title, children, status }, ref) => {
    const containerRef = useRef<HTMLLIElement>()
    useImperativeHandle(ref, () => containerRef.current)

    // const progress = useSpring(0, { stiffness: 400, damping: 90 })
    const progress = useMotionValue(0)
    const progress2 = useSpring(0, { stiffness: 800, damping: 75 })

    return (
      <li
        className={cn(
          css({
            display: 'grid',
            gridTemplateColumns: 'subgrid',
            width: '100%',
            position: 'relative',
          }),
          className,
        )}
        onPointerOver={(e) => {
          animate(progress, 1, { ease: 'easeOut', duration: 2 })
          // progress.set(1)
          e.stopPropagation()
        }}
        onPointerLeave={(e) => {
          animate(progress, 0, { ease: 'easeOut', duration: 1 })
          // progress.set(0)
          e.stopPropagation()
        }}
        ref={containerRef}
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
            progress={progress}
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
            progress={progress}
          />
        )}
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'subgrid',
            gridTemplateRows: 'auto 1fr auto auto',
            alignItems: 'start',
            gridColumn: 'span 4',
            width: '100%',
            height: '100%',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              gridArea: '1 / 1 / span 1 / span 3',
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
            <Text as='p'>{children}</Text>
          </div>

          <Text
            className={css({
              gridArea: '3 / 1 / span 1 / span 1',
              fontVariantNumeric: 'tabular-nums',
              color: '#000',
            })}
          >
            {index}
          </Text>

          <div
            className={css({
              gridArea: '3 / 4 / span 1 / span 1',
              justifySelf: 'end',
            })}
          >
            <Text>{status}</Text>
          </div>
        </div>
      </li>
    )
  },
)
