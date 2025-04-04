'use client'

import { css } from '@/design/css'

// import { Video, Image } from '@/components/canvas/webgl_image_base'
// import Text from '@/components/canvas/webgl_text'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { cn } from '@/utils/cn'
import { animate, useMotionValue, useTransform } from 'motion/react'
import { View } from '@react-three/drei'
import PixellationNoiseMaterial from '@/components/effects/pixellation_noise'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import dynamic from 'next/dynamic'
import TextReveal from '../text_reveal'

const Text = dynamic(() => import('@/components/canvas/enhancements/webgl_text'), { ssr: false })
const Video = dynamic(() => import('@/components/canvas/enhancements/webgl_video'), { ssr: false })
const Image = dynamic(() => import('@/components/canvas/enhancements/webgl_image'), { ssr: false })

export const CreativeProject = forwardRef<any, any>(
  (
    { className, index, imageSrc, videoSrc, title, children, status, imageDimensions, videoDimensions, priority, href },
    ref,
  ) => {
    const containerRef = useRef<HTMLLIElement>(undefined)
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
        <a
          className={css({
            '--hovered': 0,
            display: 'grid',
            gridTemplateColumns: 'subgrid',
            width: '100%',
            gridColumn: '1 / -1',
            gridRowGap: {
              base: '$3',
              md: '$3',
              lg: '0',
            },
            _hover: {
              '--hovered': 1,
            },
          })}
          href={href}
          target='_blank'
        >
          {videoSrc ? (
            <Video
              alt={title}
              fallback={imageSrc}
              src={videoSrc}
              className={css({
                width: '100%',
                height: '40dvh',
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
                width: {
                  base: '100%',
                },
                height: {
                  base: '40dvh',
                },

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
              gridTemplateRows: 'auto 1fr auto',
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
                fontSize: '$2',
              })}
            >
              <h2
                className={css({
                  color: '$slate12',
                })}
              >
                {title}
              </h2>
              <p
                className={css({
                  color: '$slate10',
                })}
              >
                {children}
              </p>
            </div>

            <span
              className={css({
                gridArea: {
                  base: '3 / 1 / span 1 / -1',
                  md: '3 / 1 / span 1 / -1',
                  lg: '3 / 1 / span 1 / span 1',
                },
                fontVariantNumeric: 'tabular-nums',
                color: '$slate12',
                alignSelf: 'end',
                fontSize: '$2',
              })}
            >
              {index}
            </span>

            <div
              className={css({
                gridArea: {
                  base: '3 / -2 / span 1 / -1',
                  md: '3 / -2 / span 1 / -1',
                  lg: '3 / 4 / span 1 / span 1',
                },
                justifySelf: 'end',
                alignSelf: 'end',
                fontSize: '$2',
              })}
            >
              <span
                className={css({
                  zIndex: 1,
                })}
              >
                {status}
              </span>
            </div>

            <View
              className={css({
                gridArea: {
                  base: '1 / 1 / -1 / -1',
                  md: '1 / 1 / -1 / -1',
                  lg: '1 / 1 / -1 / -1',
                },
                width: {
                  base: '50%',
                  md: '50%',
                  lg: '20%',
                },
                height: '100%',
                justifySelf: 'end',
                placeSelf: 'end',
              })}
            >
              <HoverMask progress={progress} />
            </View>
            <div
              className={css({
                opacity: 'var(--hovered)',
                position: 'absolute',
                right: 0,
                bottom: 0,
                px: '$3',
                py: '$3',
                zIndex: 1,
                pointerEvents: 'none',
                transition: 'opacity 0.5s linear',
              })}
            >
              <ArrowRightIcon color='#fff' width={32} height={32} />
            </div>
          </div>
        </a>
      </li>
    )
  },
)

const HoverMask = ({ progress }) => {
  const meshRef = useRef<any>(null)

  const hover = useTransform(progress, [0, 0.75], [0, 1])

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <PixellationNoiseMaterial progress={hover} resolution={[4, 18]} />
    </mesh>
  )
}
