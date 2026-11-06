import { animate } from 'motion'

import { type SiteEffect, defaults } from './context'

const schema = {
  /** px the element moves toward the pointer at its edges. */
  shift: { type: 'f32', default: 10, min: 0, max: 40 },
  /** Degrees it leans at its edges. */
  lean: { type: 'f32', default: 1.2, min: 0, max: 8 },
  /** Scale while hovered. */
  lift: { type: 'f32', default: 1.025, min: 1, max: 1.15 },
  /** The spring: seconds to settle, and its bounce. */
  settle: { type: 'f32', default: 0.35, min: 0.05, max: 2 },
  bounce: { type: 'f32', default: 0.25, min: 0, max: 1 },
} as const

/**
 * Lift the element and lean it toward the mouse, on the GPU only: the DOM
 * never moves, so layout and hit-testing stay put. It follows the pointer
 * itself (config triggers don't carry its position); params are read on
 * every move.
 */
export const hoverTilt: SiteEffect = () => ({
  id: 'hoverTilt',
  label: 'Hover tilt',
  scopes: ['element'],
  schema,
  create(fx, el) {
    if (!el) {
      throw new Error('hoverTilt needs an element')
    }
    const params = defaults(schema) as Record<keyof typeof schema, number>
    const t = fx.transform(el)
    let anim: { stop: () => void } | null = null
    const to = (values: { x: number; y: number; rotate: number; scale: number }) => {
      anim?.stop()
      anim = animate(t, values, { type: 'spring', visualDuration: params.settle, bounce: params.bounce })
    }
    const onMove = (e: Event) => {
      const p = e as PointerEvent
      if (p.pointerType !== 'mouse' || !t.enabled) {
        return
      }
      const r = el.getBoundingClientRect()
      const nx = (p.clientX - r.left) / r.width - 0.5
      const ny = (p.clientY - r.top) / r.height - 0.5
      to({ x: nx * params.shift, y: ny * params.shift, rotate: nx * params.lean, scale: params.lift })
    }
    const onLeave = () => to({ x: 0, y: 0, rotate: 0, scale: 1 })
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return {
      params,
      get enabled() {
        return t.enabled
      },
      set enabled(v: boolean) {
        t.enabled = v
      },
      destroy() {
        el.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerleave', onLeave)
        anim?.stop()
        t.destroy()
      },
    }
  },
})
