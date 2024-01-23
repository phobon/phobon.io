import NormalizeWheel from 'normalize-wheel'
import { useEffect, useRef } from 'react'

export type UseScrollWheelOptions = {
  scalar?: number
  callback?: () => void
}

export const useScrollWheel = (options: UseScrollWheelOptions) => {
  const { scalar = 1, callback = null } = options || {}

  const scrollRef = useRef(0)
  useEffect(() => {
    const onWheel = (e) => {
      const normalized = NormalizeWheel(e)
      const speed = normalized.pixelY

      scrollRef.current += speed * scalar

      if (callback) {
        callback()
      }
    }

    window.addEventListener('mousewheel', onWheel)
    window.addEventListener('wheel', onWheel)

    return () => {
      window.removeEventListener('mousewheel', onWheel)
      window.removeEventListener('wheel', onWheel)
    }
  }, [scalar, callback])

  return scrollRef
}
