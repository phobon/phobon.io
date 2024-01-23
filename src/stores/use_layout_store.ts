import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'

export type ThemeType = 'light' | 'dark'

export type UrlStateType = 'idle' | 'transitionOut' | 'transitionInReady' | 'transitionIn'

export type TransitionOptions = {
  duration: number
  stagger: number
}

export type GridConfiguration = {
  columns: number
  rows: number
  gutter: number
  squareGrid: boolean
  margin: number
}

export type LayoutStore = {
  theme: ThemeType
  urlState: UrlStateType

  transitionOptions: TransitionOptions

  gridConfiguration: GridConfiguration
  gridConfigurationStyles: any

  setTheme: (newTheme: ThemeType) => void
  setUrlState: (newUrlState: UrlStateType) => void
  setTransitionOptions: (newTransitionOptions: Partial<TransitionOptions>) => void
  setGridConfiguration: (newGridConfiguration: Partial<GridConfiguration>) => void
}

export const useLayoutStore = createWithEqualityFn<LayoutStore>(
  (set, get) => ({
    theme: 'dark',
    urlState: 'idle',
    transitionOptions: {
      duration: 0.5,
      stagger: 0.1,
    },
    gridConfiguration: {
      columns: 12,
      rows: 1,
      gutter: 0,
      squareGrid: true,
      margin: 0,
    },
    gridConfigurationStyles: {
      '--mainGridColumns': 12,
      '--mainGridRows': 1,
      '--mainGridGutter': '16px',
      '--mainGridMargin': '16px',
    },

    setTheme: (newTheme: ThemeType) => set({ theme: newTheme }),

    setUrlState: (newUrlState: UrlStateType) => set({ urlState: newUrlState }),

    setTransitionOptions: (newTransitionOptions: Partial<TransitionOptions>) => {
      const { transitionOptions } = get()
      set({ transitionOptions: { ...transitionOptions, ...newTransitionOptions } })
    },

    setGridConfiguration: (newGridConfiguration: Partial<GridConfiguration>) => {
      const { gridConfiguration } = get()
      const mergedGridConfiguration = { ...gridConfiguration, ...newGridConfiguration }
      const gridConfigurationStyles = {
        '--mainGridColumns': newGridConfiguration.columns,
        '--mainGridRows': newGridConfiguration.rows,
        '--mainGridGutter': `${newGridConfiguration.gutter}px`,
        '--mainGridMargin': `${newGridConfiguration.margin}px`,
      }
      set({ gridConfiguration: mergedGridConfiguration, gridConfigurationStyles })
    },
  }),
  shallow,
)
