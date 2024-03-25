import { css } from '@/design/css'

export const anchorStyles = css({
  color: '$slate11',
  fontSize: '$3',
  display: 'inline-flex',

  border: 0,
  position: 'relative',
  background: 'hsl(240, 22%, 99%)',
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
