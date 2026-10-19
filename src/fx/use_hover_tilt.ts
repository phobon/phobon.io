import { animate } from 'motion'
import { type RefObject, useEffect } from 'react'

import { useFx } from './compositor_provider'
import { canHover, prefersReducedMotion } from './dom'
import { tuning } from './tuning'

/**
 * Lift the element and lean it toward the pointer, on the GPU only: the
 * DOM never moves, so layout and hit-testing stay put. Values come from
 * `tuning.tilt`, read on every move.
 */
export function useHoverTilt(ref: RefObject<HTMLElement | null>) {
  const fx = useFx()

  useEffect(() => {
    const el = ref.current
    if (!fx || !el || !canHover() || prefersReducedMotion()) {
      return
    }

    const t = fx.transform(el)
    let anim: { stop: () => void } | null = null
    const to = (values: { x: number; y: number; rotate: number; scale: number }) => {
      anim?.stop()
      anim = animate(t, values, tuning.tilt.transition)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') {
        return
      }
      const { shift, lean, lift } = tuning.tilt
      const r = el.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      to({ x: nx * shift, y: ny * shift, rotate: nx * lean, scale: lift })
    }
    const onLeave = () => to({ x: 0, y: 0, rotate: 0, scale: 1 })

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      anim?.stop()
      t.destroy()
    }
  }, [fx, ref])
}
