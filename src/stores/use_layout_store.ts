import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'

export type ThemeType = 'light' | 'dark'

export type UrlStateType = 'idle' | 'transitionOut' | 'transitionInReady' | 'transitionIn'

export type TransitionOptions = {
  duration: number
  stagger: number
}

export type LayoutStore = {
  theme: ThemeType
  urlState: UrlStateType

  transitionOptions: TransitionOptions

  loaded: boolean
  progress: number
  setLoaded: (newLoaded: boolean) => void
  setProgress: (newProgress: number) => void

  setTheme: (newTheme: ThemeType) => void
  setUrlState: (newUrlState: UrlStateType) => void
  setTransitionOptions: (newTransitionOptions: Partial<TransitionOptions>) => void
}

export const useLayoutStore = createWithEqualityFn<LayoutStore>(
  (set, get) => ({
    theme: 'light',
    urlState: 'idle',

    transitionOptions: {
      duration: 0.5,
      stagger: 0.1,
    },

    loaded: true,
    progress: 0,
    setLoaded: (newLoaded: boolean) => set({ loaded: newLoaded }),
    setProgress: (newProgress: number) => set({ progress: newProgress }),

    setTheme: (newTheme: ThemeType) => set({ theme: newTheme }),

    setUrlState: (newUrlState: UrlStateType) => set({ urlState: newUrlState }),

    setTransitionOptions: (newTransitionOptions: Partial<TransitionOptions>) => {
      const { transitionOptions } = get()
      set({ transitionOptions: { ...transitionOptions, ...newTransitionOptions } })
    },
  }),
  shallow,
)
