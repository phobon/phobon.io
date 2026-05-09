import { Link } from '@tanstack/react-router'

import { css } from '@/design/css'

export function NotFoundPage() {
  return (
    <section
      className={css({
        gridColumn: '1 / -1',
        px: { base: '$4', md: '$5' },
        py: '$10',
      })}
    >
      <h1
        className={css({
          fontSize: '$9',
          fontWeight: '$semiBold',
          color: '$slate12',
          mb: '$4',
          lineHeight: '$tight',
        })}
      >
        Not found
      </h1>
      <p
        className={css({
          color: '$slate11',
          fontSize: '$4',
          mb: '$6',
          maxWidth: '40ch',
          lineHeight: '$snug',
        })}
      >
        That page doesn’t exist or may have moved.
      </p>
      <Link
        to='/'
        className={css({
          fontSize: '$3',
          textDecoration: 'underline',
          textUnderlineOffset: '0.15em',
          color: '$slate12',
        })}
      >
        ← Back home
      </Link>
    </section>
  )
}
