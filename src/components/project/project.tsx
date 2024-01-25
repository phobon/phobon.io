import { css } from '@/design/css'
import Link from 'next/link'
import ShiftImage from '@/components/shift_image'

export const Project = ({ project, ...props }) => {
  const { name, description, image, url } = project
  return (
    <Link href={url}>
      <div
        {...props}
        className={css({
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexDirection: {
            base: 'column',
            md: 'row',
          },
        })}
      >
        {/* When this becomes a link to an internal project, it needs a Link */}
        {/* <ShiftImage src={image} alt={name} loading='lazy' width={200} /> */}

        <div
          className={css({
            display: 'flex',
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'center',
            ml: {
              base: 0,
              md: '$5',
            },
            mt: {
              base: '$3',
              md: 0,
            },
            gap: '$2',
          })}
        >
          <h3
            className={css({
              margin: 0,
              fontSize: {
                base: '$4',
                md: '$5',
              },
            })}
          >
            {name}
          </h3>
          <p
            className={css({
              margin: 0,
              fontSize: {
                base: '$4',
                md: '$5',
              },
              color: '$slate10',
              textAlign: 'left',
            })}
          >
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}
