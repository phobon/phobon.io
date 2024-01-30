import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'
import { useEffect, useRef } from 'react'

export type CurrentSection = {
  key: string
  progress: number
}

export type ScrollData = {
  scroll: number
  percentage: number
  progress: number
  currentSection: CurrentSection
}

export type ScrollSection = {
  start: number
  end: number

  startProgress: number
  endProgress: number
}

export type InfiniteScrollStore = {
  totalHeight: number
  sections: { [key: string]: ScrollSection }

  scrollData: ScrollData

  setTotalHeight: (totalHeight: number) => void

  setScroll: (scroll: number) => void
  setScrollData: (newScrollData: Partial<ScrollData>) => void

  addSection: (key: string, section: Omit<ScrollSection, 'progress' | 'startProgress' | 'endProgress'>) => void

  reset: () => void
}

export const useInfiniteScrollStore = createWithEqualityFn<InfiniteScrollStore>(
  (set, get) => ({
    totalHeight: 0,
    sections: {},

    scrollData: {
      scroll: 0,
      percentage: 0,
      progress: 0,
      currentSection: {
        key: '0',
        progress: 0,
      },
    },

    setTotalHeight: (totalHeight: number) => set({ totalHeight }),
    setScroll: (scroll: number) =>
      set(({ totalHeight, sections }) => {
        const percentage = scroll / totalHeight
        const progress = percentage % 1

        // console.log({
        //   totalHeight,
        //   scroll,
        //   percentage,
        //   progress,
        // })

        // Determine current section
        const currentSection: CurrentSection = {
          key: '0',
          progress: 0,
        }

        Object.entries(sections).forEach(([key, section]) => {
          if (progress >= section.startProgress && progress <= section.endProgress) {
            currentSection.key = key
            currentSection.progress = (progress - section.startProgress) / (section.endProgress - section.startProgress)
          }
        })

        return {
          scrollData: {
            scroll,
            percentage,
            progress,
            currentSection,
          },
        }
      }),
    setScrollData: (newScrollData: Partial<ScrollData>) =>
      set(({ scrollData }) => ({
        scrollData: {
          ...scrollData,
          ...newScrollData,
        },
      })),

    addSection: (key: string, section: Omit<ScrollSection, 'progress' | 'startProgress' | 'endProgress'>) =>
      set(({ sections, totalHeight }) => {
        const allSections = processSections(sections, totalHeight)

        // Determine
        const startPercentage = section.start / totalHeight
        const startProgress = startPercentage === 0 ? 0 : startPercentage % 1

        const endPercentage = section.end / totalHeight
        const endProgress = endPercentage === 1 ? 1 : endPercentage % 1

        const newSection: ScrollSection = {
          ...section,
          startProgress,
          endProgress,
        }

        return {
          sections: {
            ...allSections,
            [key]: newSection,
          },
        }
      }),

    reset: () =>
      set({
        totalHeight: 0,
        sections: {},
        scrollData: {
          scroll: 0,
          percentage: 0,
          progress: 0,
          currentSection: {
            key: '0',
            progress: 0,
          },
        },
      }),
  }),
  shallow,
)

const scrollDataSelector = ({ scrollData }): Pick<InfiniteScrollStore, 'scrollData'> => ({ scrollData })

export const useInfiniteScroll = (callback: (scrollData: ScrollData) => void) => {
  const { scrollData } = useInfiniteScrollStore(scrollDataSelector)
  return scrollData
}

export const useSubscribeInfiniteScroll = (callback: (scrollData: ScrollData) => void) => {
  useEffect(() => {
    if (!callback) {
      return
    }

    const unsubscribe = useInfiniteScrollStore.subscribe(({ scrollData }) => {
      callback(scrollData)
    })

    return () => {
      unsubscribe()
    }
  })
}

export const useSubscribeCurrentSection = (callback: (currentSection: CurrentSection) => void) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!callback) {
      return
    }

    const section = sectionRef.current
    if (!section) {
      return
    }

    const unsubscribe = useInfiniteScrollStore.subscribe(({ scrollData }) => {
      const { currentSection } = scrollData
      if (currentSection.key === section?.dataset?.section) {
        callback(currentSection)
      }
    })

    return () => {
      unsubscribe()
    }
  })

  return sectionRef
}

const processSections = (sections: { [key: string]: ScrollSection }, totalHeight: number) => {
  const allSections = { ...sections }

  // For each section, recalculate all the details based on an updated totalHeight
  Object.entries(allSections).forEach(([key, section]) => {
    const startPercentage = section.start / totalHeight
    const startProgress = startPercentage === 0 ? 0 : startPercentage % 1

    const endPercentage = section.end / totalHeight
    const endProgress = endPercentage === 1 ? 1 : endPercentage % 1

    allSections[key] = {
      ...section,
      startProgress,
      endProgress,
    }
  })

  return allSections
}
