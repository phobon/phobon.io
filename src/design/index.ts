import {
  slate,
  slateDark,
  purple,
  purpleDark,
  // green,
  // orange,
  // teal,
  // cyan,
  // blue,
  // violet,
  // red,
  // yellow,
} from '@radix-ui/colors'

const transformColorPrimitive = (primitive: { [index: string]: string }, transformKey: string = null) => {
  const transformed = {}
  let index = 1
  for (const key in primitive) {
    const transformedKey = transformKey ? `$${transformKey}${index}` : `$${key}`
    transformed[transformedKey] = { value: primitive[key] }
    index += 1
  }

  return transformed
}

const transformThemedColorPrimitive = (
  primitive: { [index: string]: { value: string } },
  baseKey: string,
  darkKey: string,
  count: number,
) => {
  const transformed = {}
  for (let i = 1; i < count + 1; i++) {
    transformed[`${baseKey}${i}`] = {
      value: {
        // TODO: The docs here say that we can just use the colors collection key, but looking at the generated css
        // it seems as though this key turns into a css custom property, so effectively it creates an infinite loop
        // ie: `colors-slate1: var(--colors-slate1);`
        base: primitive[`$${baseKey}${i}`].value,
        // base: `{colors.${baseKey}${i}}`,
        _dark: `{colors.$${darkKey}${i}}`,
      },
    }
  }

  return transformed
}

const _slate = transformColorPrimitive(slate, '$slate')
const _slateDark = transformColorPrimitive(slateDark, '$slateDark')
const _purple = transformColorPrimitive(purple, '$purple')
const _purpleDark = transformColorPrimitive(purpleDark, '$purpleDark')

// const _green = transformColorPrimitive(green)
// const _orange = transformColorPrimitive(orange)
// const _teal = transformColorPrimitive(teal)
// const _cyan = transformColorPrimitive(cyan)
// const _blue = transformColorPrimitive(blue)
// const _violet = transformColorPrimitive(violet)
// const _red = transformColorPrimitive(red)
// const _yellow = transformColorPrimitive(yellow)

const slateLightDark = transformThemedColorPrimitive(_slate, '$slate', '$slateDark', Object.keys(slate).length)
const purpleLightDark = transformThemedColorPrimitive(_purple, '$purple', '$purpleDark', Object.keys(purple).length)

const colors = {
  ..._slate,
  ..._slateDark,
  ..._purple,
  ..._purpleDark,
  // ..._green,
  // ..._orange,
  // ..._teal,
  // ..._cyan,
  // ..._blue,
  // ..._violet,
  // ..._red,
  // ..._yellow,
}

export const theme = {
  tokens: {
    colors,
    spacing: {
      $0: { value: '0px' },
      $1: { value: '4px' },
      $2: { value: '8px' },
      $3: { value: '12px' },
      $4: { value: '16px' },
      $5: { value: '24px' },
      $6: { value: '32px' },
      $7: { value: '40px' },
      $8: { value: '48px' },
      $9: { value: '64px' },
      $10: { value: '96px' },
      $11: { value: '128px' },
      $12: { value: '192px' },
      $13: { value: '256px' },
      $14: { value: '384px' },
      $15: { value: '512px' },
      $16: { value: '640px' },
    },
    fonts: {
      $default: {
        value:
          '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      },
      $monospace: { value: 'SF Mono, Segoe UI Mono, Roboto Mono, Ubuntu Mono, Menlo, Courier, monospace' },
    },
    fontSizes: {
      $0: { value: '10px' },
      $1: { value: '12px' },
      $2: { value: '14px' },
      $3: { value: '16px' },
      $4: { value: '18px' },
      $5: { value: '20px' },
      $6: { value: '24px' },
      $7: { value: '30px' },
      $8: { value: '36px' },
      $9: { value: '48px' },
      $10: { value: '60px' },
      $11: { value: '72px' },
      $12: { value: '96px' },
      $13: { value: '120px' },
      $14: { value: '140px' },
    },
    fontWeights: {
      $light: { value: 300 },
      $regular: { value: 400 },
      $semiBold: { value: 600 },
      $bold: { value: 700 },
    },
    lineHeights: {
      $none: { value: 1 },
      $tight: { value: 1.25 },
      $snug: { value: 1.375 },
      $normal: { value: 1.5 },
      $relaxed: { value: 1.625 },
      $loose: { value: 2 },
    },
    letterSpacings: {
      $normal: { value: 'normal' },
      $caps: { value: '0.25em' },
    },
    sizes: {},
    opacity: {},
    borders: {},
    durations: {},
    easings: {},
    animations: {},
    blurs: {},
    gradients: {},
    breakpoints: {
      sm: { value: '640px' },
      md: { value: '768px' },
      lg: { value: '1024px' },
      xl: { value: '1280px' },
      '2xl': { value: '1536px' },
    },
    assets: {},
    radii: {
      $0: { value: '0px' },
      $1: { value: '2px' },
      $2: { value: '4px' },
      $3: { value: '8px' },
      $4: { value: '16px' },
      $5: { value: '24px' },
      $full: { value: '50%' },
    },
    shadows: {
      $0: { value: 'none' },
      $1: { value: '0 1px 3px hsla(212 27% 24% / .12), 0 1px 2px hsla(0 0% 100% / .24)' },
      $2: { value: '0 3px 6px hsla(212 27% 24% / .15), 0 2px 4px hsla(0 0% 100% / .12)' },
      $3: { value: '0 10px 20px hsla(212 27% 24% / .15), 0 3px 6px hsla(0 0% 100% / .10)' },
    },
    zIndex: {
      $0: { value: 0 },
      $1: { value: 10 },
      $2: { value: 20 },
      $3: { value: 30 },
      $4: { value: 40 },
      $max: { value: 99999 },
    },
  },
  semanticTokens: {
    colors: {
      ...slateLightDark,
      ...purpleLightDark,
    },
  },
}
