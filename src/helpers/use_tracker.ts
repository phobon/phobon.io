import { useMotionValue, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'

export const useTracker = <Type extends HTMLElement>() => {
  const trackRef = useRef<Type>()
  const [rect, setRect] = useState<DOMRect>(null)
  const intersecting = useSpring(1, { stiffness: 500, damping: 150 })

  // Scroll and view-related
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start end', 'end end'],
  })

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      intersecting.set(entry.isIntersecting ? 0 : 1)
    })
    observer.observe(track)

    return () => {
      observer.disconnect()
    }
  }, [intersecting])

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) {
      return
    }

    const trackRect = track.getBoundingClientRect()
    setRect(trackRect)

    // Hide everything once it's loaded
    track.style.opacity = '0'
    track.style.visibility = 'hidden'
  }, [setRect])

  return {
    trackRef,
    rect,
    scrollYProgress,
    intersecting,
  }
}

export const useImgTracker = () => {
  const trackRef = useRef<HTMLImageElement>()
  const viewRef = useRef<any>()
  // const [rect, setRect] = useState<DOMRect>(null)
  const intersecting = useMotionValue(false)

  // Scroll and view-related
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start end', 'end end'],
  })

  useLayoutEffect(() => {
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

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) {
      return
    }

    track.onload = () => {
      const trackRect = track.getBoundingClientRect()
      const { width, height } = trackRect
      viewRef.current.style.width = width
      viewRef.current.style.height = height
      // setRect(trackRect)

      // Hide everything once it's loaded
      track.style.opacity = '0'
      track.style.visibility = 'hidden'
    }
  }, [])

  return {
    viewRef,
    trackRef,
    // rect,
    scrollYProgress,
    intersecting,
  }
}
