import { useMotionValue, useMotionValueEvent } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import normalizeWheel from 'normalize-wheel'
import { css } from '@/design/css'
import { cn } from '@/helpers/cn'
import { InfiniteScrollStore, useInfiniteScrollStore } from '@/stores/use_infinite_scroll_store'

export type InfiniteScrollProps = {} & React.HTMLAttributes<HTMLDivElement>

const infiniteScrollDataSelector = ({
  setScroll,
  setTotalHeight,
  addSection,
  reset,
}): Pick<InfiniteScrollStore, 'setScroll' | 'setTotalHeight' | 'addSection' | 'reset'> => ({
  setScroll,
  setTotalHeight,
  addSection,
  reset,
})

export const InfiniteScroll = ({ className, children }: InfiniteScrollProps) => {
  const { setScroll, setTotalHeight, addSection, reset } = useInfiniteScrollStore(infiniteScrollDataSelector)

  const containerRef = useRef<HTMLDivElement>()
  const observedChildrenRef = useRef<any>({})

  // Height of the container
  const heightRef = useRef<number>(0)

  const directionRef = useRef<number>(0)

  // Scrolling parameters
  const scrollAmplitudeRef = useRef<number>(1)
  const scroll = useMotionValue(0)

  // Scroll the entire viewport container
  useMotionValueEvent(scroll, 'change', (latest) => {
    setScroll(latest)
    containerRef.current.style.transform = `translate3D(0px, ${-latest}px, 0px)`
  })

  // Set up a scroll observer to handle scrolling the viewport
  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    const onWheel = (event: WheelEvent) => {
      const normalized = normalizeWheel(event)
      const currentScroll = scroll.get()
      const scalar = normalized.pixelY * scrollAmplitudeRef.current
      scroll.set(currentScroll + scalar)
      directionRef.current = normalized.pixelY > 0 ? 1 : -1

      event.preventDefault()
    }
    container.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', onWheel)
    }
  }, [scroll])

  // Set up an intersection observer to handle how all of the sections
  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    // Set up a resize observer to handle resizing the viewport
    const onResize = () => {
      const rect = container.getBoundingClientRect()
      const { height } = rect
      heightRef.current = height
      setTotalHeight(height)
    }
    onResize()

    window.addEventListener('resize', onResize)

    // Create an intersection observer that fires when each section completely leaves the view
    const observer = new IntersectionObserver((entries) => {
      if (directionRef.current === 0) {
        return
      }

      entries.forEach((entry) => {
        const domElement = entry.target as HTMLDivElement
        const section = parseInt(domElement.dataset.section)

        const isScrollingDown = directionRef.current === 1

        if (!entry.isIntersecting) {
          if (isScrollingDown) {
            let scalar = parseInt(domElement.dataset.scalar) + 1

            domElement.style.transform = `translate3D(0px, ${heightRef.current * scalar}px, 0px)`
            domElement.dataset.scalar = `${scalar}`
          } else if (!isScrollingDown) {
            // If this is triggered, it means we're scrolling up and this section has left the viewport
            // So the hierarchy here is:
            // -- entering (section - 2)
            // -- current (section - 1)
            // -- leaving (section)
            const childCount = Object.keys(observedChildrenRef.current).length

            let previousSection = section
            let count = 2
            while (count > 0) {
              if (previousSection - 1 < 0) {
                previousSection = childCount
              }

              previousSection -= 1
              count -= 1
            }

            console.log({
              section,
              childCount,
              previousSection,
            })

            const previousSectionElement = observedChildrenRef.current[previousSection]

            let scalar = parseInt(previousSectionElement.dataset.scalar) - 1
            previousSectionElement.style.transform = `translate3D(0px, ${heightRef.current * scalar}px, 0px)`
            previousSectionElement.dataset.scalar = `${scalar}`
          }

          console.log(`${section}: leaving --- scrolling ${isScrollingDown ? 'down' : 'up'}`)
        } else if (entry.isIntersecting) {
          console.log(`${section}: entering --- scrolling ${isScrollingDown ? 'down' : 'up'}`)
        }
      })
    })

    const sections = {}

    // Observe any children that exist at time of render
    let childIndex = 0
    for (let i = 0; i < container.children.length; i++) {
      const child = container.children[i]
      const index = `${childIndex + i}`
      child.setAttribute('data-section', index)
      child.setAttribute('data-scalar', '0')
      observer.observe(child)
      observedChildrenRef.current[childIndex] = child

      // Add the section
      const { top, bottom } = child.getBoundingClientRect()
      addSection(index, {
        start: top,
        end: bottom,
      })
      childIndex += 1
    }

    const mutationObserver = new MutationObserver((mutationsList, o) => {
      // Look through all mutations that just occured
      for (let mutation of mutationsList) {
        // If the addedNodes property has one or more nodes
        if (mutation.addedNodes.length) {
          for (const node of mutation.addedNodes) {
            const child = node as HTMLElement
            const index = `${childIndex}`
            child.setAttribute('data-section', index)
            child.setAttribute('data-scalar', '0')
            observer.observe(child)
            observedChildrenRef.current[childIndex] = child
            childIndex += 1

            // Add the section
            const { top, bottom } = child.getBoundingClientRect()
            addSection(index, {
              start: top,
              end: bottom,
            })

            // Recalculate height of container
            onResize()
          }
        }
      }
    })

    // Start observing the container with the configured parameters
    mutationObserver.observe(container, { childList: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()

      window.removeEventListener('resize', onResize)
      reset()
    }
  }, [addSection, reset, scroll, setTotalHeight])

  return (
    <div
      ref={containerRef}
      className={cn(
        css({
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          willChange: 'transform',
        }),
        className,
      )}
    >
      {children}
    </div>
  )
}