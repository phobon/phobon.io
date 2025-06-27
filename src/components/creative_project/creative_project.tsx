import { css } from '@/design/css'
import Image from 'next/image'

export const CreativeProject = ({ ref, ...props }) => {
  const { index, imageSrc, videoSrc, title, children, status, priority, href, objectFit } = props

  return (
    <a
      className={css({
        display: 'grid',
        gridTemplateColumns: 'subgrid',
        width: '100%',
        gridColumn: '1 / -1',
        gridRowGap: {
          base: '$2',
        },
      })}
      ref={ref}
      href={href}
      target='_blank'
    >
      <section
        className={css({
          width: '100%',
          aspectRatio: '1 / 1',
          maxHeight: '80dvh',
          position: 'relative',
          gridColumn: {
            base: '1 / -1',
          },
          backgroundColor: '$slate2',
        })}
      >
        {videoSrc ? (
          <video
            className={css({
              position: 'absolute',
              objectFit: objectFit || 'cover',
            })}
            src={videoSrc}
          />
        ) : (
          <Image
            alt={title}
            src={imageSrc}
            className={css({
              position: 'absolute',
              objectFit: objectFit || 'cover',
            })}
            fill
            priority={priority}
          />
        )}
      </section>

      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'subgrid',
          gridAutoRows: 'auto',
          alignItems: 'start',
          gridColumn: {
            base: '1 / -1',
          },
          gridRowGap: {
            base: '$2',
          },
        })}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            gridColumn: '1 / -1',
            fontSize: '$2',
          })}
        >
          <span
            className={css({
              fontVariantNumeric: 'tabular-nums',
            })}
          >
            {index}
          </span>
          <span>{status}</span>
        </div>

        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gridColumn: '1 / -1',
            lineHeight: '$tight',
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
      </div>
    </a>
  )
}
