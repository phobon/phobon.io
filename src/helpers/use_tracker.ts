import { useMotionValue, useScroll, useSpring } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'

export const useTracker = <Type extends HTMLElement>() => {
  const trackRef = useRef<Type>()
  const [rect, setRect] = useState<DOMRect>(null)
  const intersecting = useSpring(1, { stiffness: 100, damping: 20 })

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
      console.log(entry.isIntersecting)
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
  const [rect, setRect] = useState<DOMRect>(null)
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
      setRect(trackRect)
    }
  }, [setRect])

  return {
    trackRef,
    rect,
    scrollYProgress,
    intersecting,
  }
}
