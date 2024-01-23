import { cva } from '@/design/css'

export const layoutContainerStyles = cva({
  base: {
    zIndex: 1,
    m: 0,
    width: '100%',
  },

  variants: {
    position: {
      absolute: {
        position: 'absolute',
      },
      relative: {
        position: 'relative',
      },
      sticky: {
        position: 'sticky',
      },
    },
    snap: {
      top: {
        left: 0,
        top: 0,
      },
      bottom: {
        left: 0,
        bottom: 0,
      },
      none: {
        inset: 0,
      },
    },
  },
  defaultVariants: {
    position: 'absolute',
    snap: 'top',
  },
})
