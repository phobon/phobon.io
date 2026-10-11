import { useEffect } from 'react'

import { useTrail } from './compositor_provider'
import { prefersReducedMotion } from './dom'
import { tuning } from './tuning'

type Point = { x: number; y: number }

/**
 * Feeds the page's trail from touch, where `trail.pointer` is off (touch
 * moves are scrolls). A finger's path leaves a trail, scrolling drags
 * included: touch events keep arriving while the browser pans, unlike
 * pointer events, which it cancels. A tap leaves a radial burst.
 * Values come from `tuning.touch`. Mouse and trackpad input is left to the
 * trail's own pointer tracking.
 */
export function useTouchTrail() {
  const trail = useTrail()

  useEffect(() => {
    if (!trail || prefersReducedMotion()) {
      return
    }
    // One finger at a time: the first touch's identifier.
    let id: number | null = null
    let last: (Point & { t: number }) | null = null
    let start: (Point & { t: number }) | null = null
    let moved = 0

    const find = (list: TouchList) => {
      for (const t of Array.from(list)) {
        if (t.identifier === id) {
          return t
        }
      }
      return null
    }

    const onStart = (e: TouchEvent) => {
      if (id !== null) {
        return
      }
      const t = e.changedTouches[0]
      if (!t) {
        return
      }
      id = t.identifier
      last = start = { x: t.clientX, y: t.clientY, t: e.timeStamp }
      moved = 0
    }
    const onMove = (e: TouchEvent) => {
      const t = find(e.changedTouches)
      if (!t || !last) {
        return
      }
      const p = { x: t.clientX, y: t.clientY, t: e.timeStamp }
      const d = Math.hypot(p.x - last.x, p.y - last.y)
      const dt = Math.max(p.t - last.t, 1) / 1000
      moved += d
      if (d > 0.5) {
        trail.stroke(last, p, (d / dt) * tuning.touch.drag)
      }
      last = p
    }
    const onEnd = (e: TouchEvent) => {
      const t = find(e.changedTouches)
      if (!t) {
        return
      }
      const { tap, tapSpeed, spokes, tapMs } = tuning.touch
      if (e.type === 'touchend' && start && moved < 10 && e.timeStamp - start.t < tapMs) {
        // A tap: short strokes out from the point, so the trail pass pushes
        // the page outward around it.
        const a = Math.random() * Math.PI
        for (let i = 0; i < spokes; i++) {
          const r = a + (i / spokes) * Math.PI * 2
          trail.stroke(start, { x: start.x + Math.cos(r) * tap, y: start.y + Math.sin(r) * tap }, tapSpeed)
        }
      }
      id = null
      last = start = null
    }

    const opts = { passive: true } as const
    window.addEventListener('touchstart', onStart, opts)
    window.addEventListener('touchmove', onMove, opts)
    window.addEventListener('touchend', onEnd, opts)
    window.addEventListener('touchcancel', onEnd, opts)
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
      window.removeEventListener('touchcancel', onEnd)
    }
  }, [trail])
}
