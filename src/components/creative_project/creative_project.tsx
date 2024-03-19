'use client'

import { css } from '@/design/css'

import { Video, Image } from '../canvas/webgl_images'
import Text from '../canvas/webgl_text'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { cn } from '@/helpers/cn'
import { Stinger } from './stinger'
import { animate, useMotionValue, useSpring } from 'framer-motion'

export const CreativeProject = forwardRef<any, any>(
  (
    { className, index, imageSrc, videoSrc, title, children, status, imageDimensions, videoDimensions, priority },
    ref,
  ) => {
    const containerRef = useRef<HTMLLIElement>()
    useImperativeHandle(ref, () => containerRef.current)

    const progress = useMotionValue(0)

    return (
      <li
        className={cn(
          css({
            display: 'grid',
            gridTemplateColumns: 'subgrid',
            width: '100%',
            position: 'relative',
            gridRowGap: {
              base: '$3',
              md: '$3',
              lg: '0',
            },
          }),
          className,
        )}
        onPointerOver={(e) => {
          animate(progress, 1, { ease: 'easeOut', duration: 2 })
          e.stopPropagation()
        }}
        onPointerLeave={(e) => {
          animate(progress, 0, { ease: 'easeOut', duration: 1 })
          e.stopPropagation()
        }}
        ref={containerRef}
      >
        {videoSrc ? (
          <Video
            alt={title}
            fallback={imageSrc}
            src={videoSrc}
            className={css({
              width: '100%',
              height: '40vh',
              gridColumn: {
                base: '1 / -1',
                md: '1 / -1',
                lg: 'span 8',
              },
            })}
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
            className={css({
              width: '100%',
              height: '40vh',
              gridColumn: {
                base: '1 / -1',
                md: '1 / -1',
                lg: 'span 8',
              },
            })}
            progress={progress}
            width={imageDimensions[0]}
            height={imageDimensions[1]}
            priority={priority}
          />
        )}
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'subgrid',
            gridTemplateRows: 'auto 1fr auto auto',
            alignItems: 'start',
            gridColumn: {
              base: '1 / -1',
              md: '1 / -1',
              lg: 'span 4',
            },
            gridRowGap: {
              base: '$3',
              md: '$3',
              lg: '$3',
            },
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
              gridArea: {
                base: '1 / 1 / span 1 / -1',
                md: '1 / 1 / span 1 / -1',
                lg: '1 / 1 / span 1 / span 3',
              },
              gap: '$1',
            })}
          >
            <Text
              as='h2'
              className={css({
                color: '$slate12',
              })}
            >
              {title}
            </Text>
            <Text
              as='p'
              className={css({
                color: '$slate10',
              })}
            >
              {children}
            </Text>
          </div>

          <Text
            className={css({
              gridArea: {
                base: '3 / 1 / span 1 / -1',
                md: '3 / 1 / span 1 / -1',
                lg: '3 / 1 / span 1 / span 1',
              },
              fontVariantNumeric: 'tabular-nums',
              color: '$slate12',
            })}
          >
            {index}
          </Text>

          <div
            className={css({
              gridArea: {
                base: '3 / -2 / span 1 / -1',
                md: '3 / -2 / span 1 / -1',
                lg: '3 / 4 / span 1 / span 1',
              },
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
