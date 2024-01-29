import { useLayoutEffect, useRef, useState } from 'react'

export const useTracker = <Type extends HTMLElement>() => {
  const trackRef = useRef<Type>()
  const [rect, setRect] = useState<DOMRect>(null)

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
  }
}

export const useImgTracker = () => {
  const trackRef = useRef<HTMLImageElement>()
  const [rect, setRect] = useState<DOMRect>(null)

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
  }
}
