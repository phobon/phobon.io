import type { Material, Transform } from 'compositor-gpu/fx'
import { animate } from 'motion'

import type { SiteEffect } from './context'

// Letter k of n rises and settles over its own window of `progress`,
// offset by k / n * spread: a wave that runs along the title once.
const RIPPLE = /* wgsl */ `
fn vertex(local : vec2f, size : vec2f, uv : vec2f, record : u32) -> vec2f {
  let n = max(fx.glyphs - 1.0, 1.0);
  let k = f32(mat_index(record)) / n;
  let t = clamp(params.progress * (1.0 + params.spread) - k * params.spread, 0.0, 1.0);
  return local - vec2f(0.0, sin(t * 3.14159265) * params.lift);
}
`

const rippleSchema = {
  progress: { type: 'f32', default: 0, min: 0, max: 1 },
  spread: { type: 'f32', default: 1.5, min: 0, max: 8 },
  lift: { type: 'f32', default: 4, min: 0, max: 24 },
} as const

const schema = {
  /** px the `[data-row-arrow]` is moved right (past ~3 it pokes out of
   * the row's hover fill). Triggers tween it. */
  nudge: { type: 'f32', default: 0, min: -32, max: 32 },
  /** The `[data-row-title]` letters' ripple: px, spread along the title,
   * and seconds a `play` runs it. */
  lift: { type: 'f32', default: 4, min: 0, max: 24 },
  spread: { type: 'f32', default: 1.5, min: 0, max: 8 },
  duration: { type: 'f32', default: 0.45, min: 0.1, max: 2 },
} as const

/**
 * A Projects list row under the pointer: `play` runs a ripple through its
 * title's letters once (not restarted while it runs), and `nudge` moves
 * its arrow. On the GPU only; the DOM doesn't move.
 */
export const rowHover: SiteEffect = () => ({
  id: 'rowHover',
  label: 'Row hover',
  scopes: ['element'],
  schema,
  impulse: true,
  create(fx, el) {
    if (!el) {
      throw new Error('rowHover needs an element')
    }
    const title = el.querySelector('[data-row-title]')
    const arrow = el.querySelector('[data-row-arrow]')
    const nudge: Transform | null = arrow ? fx.transform(arrow) : null
    // Created disabled: it compiles on first use, and is only on (and
    // re-uploading the row's text) while the ripple plays.
    const ripple: Material<typeof rippleSchema> | null = title
      ? fx.material({
          name: 'row-ripple',
          target: title,
          kinds: ['glyph'],
          params: rippleSchema,
          vertex: RIPPLE,
          enabled: false,
        })
      : null
    let on = true
    let duration: number = schema.duration.default
    let rippling: ReturnType<typeof animate> | null = null

    const params: Record<string, unknown> = {}
    Object.defineProperties(params, {
      nudge: {
        enumerable: true,
        get: () => nudge?.x ?? 0,
        set: (v: number) => {
          if (nudge) {
            nudge.x = v
          }
        },
      },
      lift: {
        enumerable: true,
        get: () => ripple?.params.lift ?? schema.lift.default,
        set: (v: number) => {
          if (ripple) {
            ripple.params.lift = v
          }
        },
      },
      spread: {
        enumerable: true,
        get: () => ripple?.params.spread ?? schema.spread.default,
        set: (v: number) => {
          if (ripple) {
            ripple.params.spread = v
          }
        },
      },
      duration: {
        enumerable: true,
        get: () => duration,
        set: (v: number) => {
          duration = v
        },
      },
    })

    return {
      params,
      get enabled() {
        return on
      },
      set enabled(v: boolean) {
        on = v
        if (nudge) {
          nudge.enabled = v
        }
        if (!v && ripple) {
          rippling?.stop()
          rippling = null
          ripple.enabled = false
        }
      },
      play() {
        if (!on || !ripple || rippling) {
          return
        }
        ripple.enabled = true
        const a = animate(ripple.params, { progress: [0, 1] }, { duration, ease: 'linear' })
        rippling = a
        void a.then(() => {
          if (rippling === a) {
            rippling = null
            ripple.enabled = false
          }
        })
      },
      destroy() {
        rippling?.stop()
        nudge?.destroy()
        ripple?.destroy()
      },
    }
  },
})
