import { useMediaQuery } from '@uidotdev/usehooks'
import { animate, useMotionValue, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

export type UseTrackerOptions = {
  hide?: boolean
}

export const useTracker = <Type extends HTMLElement>(options?: UseTrackerOptions) => {
  const trackRef = useRef<Type>(null)
  const [rect, setRect] = useState<DOMRect>(null)
  const intersectingValue = useMotionValue(0)
  const intersecting = useSpring(intersectingValue, { stiffness: 500, damping: 150 })

  const { hide = false } = options || {}

  // Scroll and view-related
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start end', 'end end'],
  })

  useEffect(() => {
    const track = trackRef.current
    if (!track) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      // animate(intersectingValue, entry.isIntersecting ? 0 : 1, { ease: 'easeOut', duration: 0.75 })
      intersectingValue.set(entry.isIntersecting ? 0 : 1)
    })
    observer.observe(track)

    return () => {
      observer.disconnect()
    }
  }, [intersectingValue])

  useEffect(() => {
    const track = trackRef.current
    if (!track) {
      return
    }

    const trackRect = track.getBoundingClientRect()
    setRect(trackRect)

    // Hide everything once it's loaded
    if (hide) {
      track.style.opacity = '0'
      track.style.visibility = 'hidden'
    }
  }, [setRect, hide])

  return {
    hidden: hide,
    trackRef,
    rect,
    scrollYProgress,
    intersecting,
  }
}

export const useImgTracker = (options?: UseTrackerOptions) => {
  const trackRef = useRef<HTMLImageElement>(null)
  const viewRef = useRef<any>(null)
  // const [rect, setRect] = useState<DOMRect>(null)
  const intersecting = useMotionValue(false)

  const { hide = false } = options || {}

  // Scroll and view-related
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start end', 'end end'],
  })

  useEffect(() => {
    const track = trackRef.current
    if (!track) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      intersecting.set(entry.isIntersecting)
    })
    observer.observe(track)

    return () => {
      observer.disconnect()
    }
  }, [intersecting])

  useEffect(() => {
    const track = trackRef.current
    if (!track) {
      return
    }

    track.onload = () => {
      if (!viewRef.current) {
        return
      }

      const trackRect = track.getBoundingClientRect()
      const { width, height } = trackRect
      viewRef.current.style.width = width
      viewRef.current.style.height = height

      // Hide everything once it's loaded
      if (hide) {
        track.style.opacity = '0'
        track.style.visibility = 'hidden'
      }
    }
  }, [hide])

  return {
    hidden: hide,
    viewRef,
    trackRef,
    // rect,
    scrollYProgress,
    intersecting,
  }
}
