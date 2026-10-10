import { css } from '@/design/css'

/**
 * Spread onto elements using `anchorStyles`. compositor-gpu can't mirror the
 * hover wipe (an `::after` using `scale` and `mix-blend-mode: difference`; it
 * would draw as a solid white box), so these keep their own DOM paint and the
 * mirror leaves a hole for them.
 */
export const anchorGpuProps = { 'data-gpu-ignore': '' } as const

export const anchorStyles = css({
  color: '$slate11',
  fontSize: '$2',
  display: 'inline-flex',

  border: 0,
  position: 'relative',
  background: '#fff',
  cursor: 'pointer',
  padding: 0,
  transition: 'color 0.25s ease-in-out',
  '&> *': {
    transition: 'color 0.25s ease-in-out',
  },

  _hover: {
    color: '#000',
    '&> *': {
      color: '#000',
    },
  },

  _after: {
    content: '""',
    background: 'white',
    position: 'absolute',
    inset: 0,
    mixBlendMode: 'difference',
    scale: '0 1',
    transformOrigin: '100% 50%',
    transition: 'scale 0.25s ease-in-out',
    pointerEvents: 'none',
  },

  '&:is(:hover, :focus-visible)::after': {
    scale: '1 1',
    transformOrigin: '0 50%',
    transition: 'scale 0.25s 0.1s ease-in-out',
  },
})
