import { Hsluv } from 'hsluv'

export const white = 'hsl(0, 0%, 100%)'
export const black = 'hsl(0, 0%, 0%)'
export const transparent = 'hsla(0, 0%, 0%, 0)'
export const focus = 'hsl(211, 97%, 61%)'

const conv = new Hsluv()

const hsluvMap = (c: any) => {
  const [h, s, l] = c
  conv.hsluv_h = h
  conv.hsluv_s = s
  conv.hsluv_l = l
  conv.hsluvToHex()
  return conv.hex
}

export type PaletteType =
  | 'grayscale'
  | 'blues'
  | 'cyans'
  | 'greens'
  | 'yellows'
  | 'oranges'
  | 'reds'
  | 'purples'
  | 'violets'

const hues: { [key: string]: number } = {
  lightGrayscale: 240,
  darkGrayscale: 216,
  blues: 258,
  cyans: 232,
  greens: 137,
  yellows: 69,
  oranges: 39,
  reds: 12,
  purples: 288,
  violets: 272,
}

const baseSaturations: number[] = [98, 98, 98, 98, 98, 97, 96, 96, 95, 95]

const baseLightnesses: number[] = [15, 23, 32, 40, 49, 60, 70, 81, 92, 98]

const saturations: { [key: string]: number[] } = {
  lightGrayscale: [29, 25, 21, 16, 12, 9, 6, 4, 3, 3],
  darkGrayscale: [3, 3, 4, 6, 9, 12, 16, 21, 25, 29],
  greens: [98, 98, 98, 98, 98, 78, 65, 45, 35, 30],
}

const lightnesses: { [key: string]: number[] } = {
  lightGrayscale: [10, 17, 22, 31, 44, 65, 79, 90, 97, 99],
  darkGrayscale: [91, 88, 81, 72, 60, 47, 36, 28, 24, 22],
}

const hsl = (key: string, colour: number): number[][] => {
  const c: number[][] = []
  for (let i = 0; i < baseLightnesses.length; i++) {
    const l = lightnesses[key] ? lightnesses[key][i] : baseLightnesses[i]
    const s = saturations[key] ? saturations[key][i] : baseSaturations[i]
    c.push([colour, s, l])
  }

  return c
}

// Map each of the palettes
const paletteMapper = (): { [key: string]: any[] } => {
  const p = {}
  Object.keys(hues).forEach((k) => {
    p[k] = hsl(k, hues[k]).map(hsluvMap)
  })

  return p
}

const c = paletteMapper()

const accent = c.blues.map((g, i) => `var(--c-accent-${i}, ${g})`)

export const grayscale = c.lightGrayscale.map((g, i) => `var(--c-grayscale-${i}, ${g})`)

export const colour: { [key: string]: string[] } = {
  accent,
  ...c,
}
const palettes = Object.keys(hues)

export const randomA11y = () => {
  const r = Math.floor(Math.random() * palettes.length)
  const palette = palettes[r]
  return [colour[palette][0], colour[palette][8]]
}

export const randomColor = () => {
  const r = Math.floor(Math.random() * palettes.length)
  const palette = palettes[r]

  const item = Math.floor(Math.random() * palette.length)
  return colour[palette][item]
}

export type ThemeType = 'light' | 'dark'
export interface IThemeDefinition {
  foreground: string
  background: string
  grayscale: string[]
}
export const themeDefinitions: { [key: string]: IThemeDefinition } = {
  light: {
    foreground: 'hsl(228, 34%, 11%)',
    background: 'hsl(0, 0%, 100%)',
    grayscale: [...colour.lightGrayscale],
  },
  dark: {
    foreground: 'hsl(220, 62%, 95%)',
    background: 'hsl(219, 12%, 18%)',
    grayscale: [...colour.darkGrayscale],
  },
}
export const getTheme = (type: ThemeType): IThemeDefinition => themeDefinitions[type]
