import { useMediaQuery } from '@uidotdev/usehooks'
import { animate, useMotionValue, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export type UseTrackerOptions = {
  hide?: boolean
}

export const useTracker = <Type extends HTMLElement>(options?: UseTrackerOptions) => {
  const trackRef = useRef<Type>()
  const [rect, setRect] = useState<DOMRect>(null)
  const intersectingValue = useMotionValue(0)
  const intersecting = useSpring(intersectingValue, { stiffness: 500, damping: 150 })

  const { hide = false } = options || {}
  const desktop = useMediaQuery('only screen and (min-width: 768px)')
  let trulyHide = hide
  if (!desktop) {
    trulyHide = false
  }

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
    if (trulyHide) {
      track.style.opacity = '0'
      track.style.visibility = 'hidden'
    }
  }, [setRect, trulyHide])

  return {
    hidden: trulyHide,
    trackRef,
    rect,
    scrollYProgress,
    intersecting,
  }
}

export const useImgTracker = (options?: UseTrackerOptions) => {
  const trackRef = useRef<HTMLImageElement>()
  const viewRef = useRef<any>()
  // const [rect, setRect] = useState<DOMRect>(null)
  const intersecting = useMotionValue(false)

  const { hide = false } = options || {}
  const mobile = useMediaQuery('only screen and (max-width: 768px)')
  const trulyHide = hide || !mobile

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
      if (trulyHide) {
        track.style.opacity = '0'
        track.style.visibility = 'hidden'
      }
    }
  }, [trulyHide])

  return {
    hidden: trulyHide,
    viewRef,
    trackRef,
    // rect,
    scrollYProgress,
    intersecting,
  }
}
