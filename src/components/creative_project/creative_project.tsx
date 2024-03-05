'use client'

import { css } from '@/design/css'

import Video from '../canvas/webgl_video'
import Image from '../canvas/webgl_image'
import Text from '../canvas/webgl_text'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { cn } from '@/helpers/cn'
import { Stinger } from './stinger'
import { useSpring } from 'framer-motion'

export const CreativeProject = forwardRef<any, any>(
  ({ className, index, imageSrc, videoSrc, title, children, status }, ref) => {
    const containerRef = useRef<HTMLLIElement>()
    useImperativeHandle(ref, () => containerRef.current)

    const progress = useSpring(0, { bounce: 0 })
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
        onPointerOver={() => {
          progress.set(1)

          setTimeout(() => {
            progress2.set(1)
          }, 200)
        }}
        onPointerLeave={() => {
          progress.set(0)
          progress2.set(0)

          setTimeout(() => {}, 200)
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

        <Stinger progress={progress} progress2={progress2} />
      </li>
    )
  },
)
