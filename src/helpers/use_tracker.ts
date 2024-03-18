import { animate, useMotionValue, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export type UseTrackerOptions = {
  hide?: boolean
}

export const useTracker = <Type extends HTMLElement>(options?: UseTrackerOptions) => {
  const { hide = true } = options || {}
  const trackRef = useRef<Type>()
  const [rect, setRect] = useState<DOMRect>(null)
  // const intersecting = useSpring(1, { stiffness: 500, damping: 150 })
  const intersecting = useMotionValue(0)

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
      animate(intersecting, entry.isIntersecting ? 0 : 1, { ease: 'easeOut', duration: 0.75 })
      // intersecting.set(entry.isIntersecting ? 0 : 1)
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

    const trackRect = track.getBoundingClientRect()
    setRect(trackRect)

    // Hide everything once it's loaded
    track.style.opacity = '0'
    if (hide) {
      track.style.visibility = 'hidden'
    }
  }, [setRect, hide])

  return {
    trackRef,
    rect,
    scrollYProgress,
    intersecting,
  }
}

export const useImgTracker = (options?: UseTrackerOptions) => {
  const { hide = true } = options || {}
  const trackRef = useRef<HTMLImageElement>()
  const viewRef = useRef<any>()
  // const [rect, setRect] = useState<DOMRect>(null)
  const intersecting = useMotionValue(false)

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
      track.style.opacity = '0'
      if (hide) {
        track.style.visibility = 'hidden'
      }
    }
  }, [hide])

  return {
    viewRef,
    trackRef,
    // rect,
    scrollYProgress,
    intersecting,
  }
}
