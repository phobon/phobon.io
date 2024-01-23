import { white, black, focus, grayscale, colour } from './palettes'
import {
  breakpoints,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  radii,
  boxShadows,
  space,
  textStyles,
  densities,
} from './tokens'

const lightSwatch: any = {
  background: `var(--c-background, ${white})`,
  foreground: `var(--c-foreground, ${grayscale[0]})`,
  grayscale: [...grayscale],
}

const excludes = ['lightGrayscale', 'darkGrayscale']
let secondary = {}
Object.keys(colour).forEach((k) => {
  if (excludes.includes(k)) {
    return
  }

  const c = colour[k]
  secondary[k] = c
})

// Construct a base colors object to use in a theme.
const guidance: GuidanceColours = {
  info: [colour.blues[0], colour.blues[8]],
  error: [colour.reds[0], colour.reds[8]],
  warning: [colour.oranges[0], colour.oranges[8]],
  success: [colour.greens[0], colour.greens[8]],
  focus,
}
const baseColors = {
  // Primary palettes
  black,
  white,

  ...(secondary as SecondaryColours),

  // Guidance palettes
  guidance,
}

const lightColors = { ...baseColors, ...lightSwatch }

// Construct a base theme with values we want.
const tokens = {
  breakpoints,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  radii,
  boxShadows,
  space,
  textStyles,
  densities,
}

interface GuidanceColours {
  info: [string, string]
  error: [string, string]
  warning: [string, string]
  success: [string, string]
  focus: string
}
interface SecondaryColours {
  grayscale: string[]
  accent: string[]
  blues: string[]
  cyans: string[]
  greens: string[]
  yellows: string[]
  oranges: string[]
  reds: string[]
  purples: string[]
  violets: string[]
}
interface Colours extends SecondaryColours {
  black: string
  white: string
  guidance: GuidanceColours
  foreground: string
  background: string
}
export type BaseTheme = {
  colors: Colours
  breakpoints: string[]
  fonts: { [key: string]: string }
  fontSizes: number[]
  fontWeights: { [key: string]: number }
  letterSpacings: { [key: string]: string }
  lineHeights: number[]
  radii: (number | string)[]
  boxShadows: string[]
  space: number[]
  textStyles: { [key: string]: { [key: string]: string } }
  densities: { [key: string]: number }
}

export const theme: BaseTheme = {
  ...tokens,
  colors: { ...lightColors },
}
export { randomA11y, randomColor, getTheme, themeDefinitions } from './palettes'
