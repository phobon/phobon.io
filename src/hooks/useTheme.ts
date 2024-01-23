import { useEffect } from 'react'
import { useCachedState } from './useCachedState'

export type ThemeType = 'light' | 'dark'

export interface IThemeDefinition {
  foreground: string
  background: string
  grayscale: string[]
}

type UseThemeType = [ThemeType, React.Dispatch<React.SetStateAction<ThemeType>>]
export const useTheme = (
  initial: ThemeType = 'light',
  themeFunction: (type: ThemeType) => IThemeDefinition,
): UseThemeType => {
  const [theme, setTheme] = useCachedState<ThemeType>('phobon__base:theme', initial)

  useEffect(() => {
    if (!theme) {
      return
    }

    requestAnimationFrame(() => {
      const root: HTMLElement | null = document.querySelector(':root')
      if (!root) {
        throw Error(':root element not found')
      }

      const newTheme = themeFunction(theme as ThemeType)

      root.style.setProperty('--c-foreground', newTheme.foreground)
      root.style.setProperty('--c-background', newTheme.background)
      newTheme.grayscale.forEach((c, i) => {
        root.style.setProperty(`--c-grayscale-${i}`, c)
      })
    })
  }, [theme])

  return [theme, setTheme] as UseThemeType
}
