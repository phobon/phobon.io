import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'
import {
  slate,
  slateDark,
  purple,
  purpleDark,
  green,
  greenDark,
  orange,
  orangeDark,
  teal,
  tealDark,
  cyan,
  cyanDark,
  blue,
  blueDark,
  violet,
  violetDark,
  red,
  redDark,
  yellow,
  yellowDark,
} from '@radix-ui/colors'

export const MEDIA_QUERIES = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  motion: '(prefers-reduced-motion)',
  hover: '(any-hover: hover)',
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',
}

const grey = {}
Object.values(slate).forEach((value, i) => {
  const key = `grey${i + 1}`
  grey[key] = value
})

const greyDark = {}
Object.values(slateDark).forEach((value, i) => {
  const key = `grey${i + 1}`
  greyDark[key] = value
})

export const config = createStitches({
  prefix: '',
  theme: {
    colors: {
      ...grey,
      ...purple,
      ...green,
      ...orange,
      ...teal,
      ...cyan,
      ...blue,
      ...violet,
      ...red,
      ...yellow,

      // Theme-specific
      foreground: '$grey11',
      background: '$grey1',
    },
    space: {
      0: '0px',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '24px',
      6: '32px',
      7: '40px',
      8: '48px',
      9: '64px',
      10: '96px',
      11: '128px',
      12: '192px',
      13: '256px',
      14: '384px',
      15: '512px',
      16: '640px',
    },
    fontSizes: {
      0: '10px',
      1: '12px',
      2: '14px',
      3: '16px',
      4: '18px',
      5: '20px',
      6: '24px',
      7: '30px',
      8: '36px',
      9: '48px',
      10: '60px',
      11: '72px',
      12: '96px',
      13: '120px',
    },
    fonts: {
      default:
        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      monospace:
        'SF Mono, Segoe UI Mono, Roboto Mono, Ubuntu Mono, Menlo, Courier, monospace',
    },
    lineHeights: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
    letterSpacings: {
      normal: 'normal',
      caps: '0.25em',
    },
    sizes: {},
    borderWidths: {},
    borderStyles: {},
    radii: {
      0: '0px',
      1: '2px',
      2: '4px',
      3: '8px',
      4: '16px',
      5: '24px',
      full: '50%',
    },
    shadows: {
      0: 'none',
      1: '0 1px 3px hsla(212 27% 24% / .12), 0 1px 2px hsla(0 0% 100% / .24)',
      2: '0 3px 6px hsla(212 27% 24% / .15), 0 2px 4px hsla(0 0% 100% / .12)',
      3: '0 10px 20px hsla(212 27% 24% / .15), 0 3px 6px hsla(0 0% 100% / .10)',
    },
    zIndices: {
      '-1': -1,
      0: 0,
      1: 10,
      2: 20,
      3: 30,
      4: 40,
      max: '99999999',
    },
    transitions: {},
  },
  media: {
    ...MEDIA_QUERIES,
  },
  utils: {
    p: (value: Stitches.ScaleValue<'space'>) => ({
      padding: value,
    }),
    pl: (value: Stitches.ScaleValue<'space'>) => ({
      paddingLeft: value,
    }),
    pt: (value: Stitches.ScaleValue<'space'>) => ({
      paddingTop: value,
    }),
    pr: (value: Stitches.ScaleValue<'space'>) => ({
      paddingRight: value,
    }),
    pb: (value: Stitches.ScaleValue<'space'>) => ({
      paddingBottom: value,
    }),
    px: (value: Stitches.ScaleValue<'space'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: Stitches.ScaleValue<'space'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    m: (value: Stitches.ScaleValue<'space'>) => ({
      margin: value,
    }),
    ml: (value: Stitches.ScaleValue<'space'>) => ({
      marginLeft: value,
    }),
    mt: (value: Stitches.ScaleValue<'space'>) => ({
      marginTop: value,
    }),
    mr: (value: Stitches.ScaleValue<'space'>) => ({
      marginRight: value,
    }),
    mb: (value: Stitches.ScaleValue<'space'>) => ({
      marginBottom: value,
    }),
    mx: (value: Stitches.ScaleValue<'space'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: Stitches.ScaleValue<'space'>) => ({
      marginTop: value,
      marginBottom: value,
    }),
  },
})

export const { css, styled, globalCss, createTheme, keyframes, getCssText } =
  config

export type CSS = Stitches.CSS<typeof config>

export const dark = createTheme('geiger__theme--dark', {
  colors: {
    ...greyDark,
    ...purpleDark,
    ...greenDark,
    ...orangeDark,
    ...tealDark,
    ...cyanDark,
    ...blueDark,
    ...violetDark,
    ...redDark,
    ...yellowDark,
  },
  shadows: {
    0: 'none',
    1: 'none',
    2: 'none',
    3: 'none',
  },
})

const globalStyles = globalCss({
  ':root, body': {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    fontSize: 8,
  },
  body: {
    fontFamily: '$default',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 1.43,
  },
  '*, ::before, ::after': {
    boxSizing: 'border-box',
  },
  'a, a:hover, a:visited': {
    textDecoration: 'none',
  },
  ul: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  'code, kbd': {
    fontFamily: '$monospace',
  },
  template: {
    display: 'none',
  },
  'article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section':
    {
      display: 'block',
    },
  'html, body, p, div, h1, h2, h3, h4, h5, h6, ul, ol, dl, img, pre, form, fieldset':
    {
      margin: 0,
      padding: 0,
    },
  'img, fieldset': {
    border: 0,
  },
  figure: {
    margin: 0,
  },
  '#__next': {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    placeItems: 'center',
    overflowX: 'hidden',
  },
})

globalStyles()
