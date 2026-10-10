import { animate, inView } from 'motion'
import { type RefObject, useEffect } from 'react'

import { useFx } from './compositor_provider'
import { isInViewport, prefersReducedMotion } from './dom'

export type TextStaggerOptions = {
  /** Seconds for the whole run, first letter to last settled. */
  duration?: number
  /** Share of the run spent staggering (0: all at once, 1: one by one). */
  spread?: number
  /** CSS px each letter rises from. */
  rise?: number
}

// Each glyph k of n arrives over its own window of `progress`, offset by
// k / n * spread. mat_index numbers the target's glyphs in DOM order.
const ARRIVE = /* wgsl */ `
fn arrive(record : u32) -> f32 {
  let n = max(fx.glyphs - 1.0, 1.0);
  let k = f32(mat_index(record)) / n;
  let t = clamp((params.progress * (1.0 + params.spread) - k * params.spread), 0.0, 1.0);
  return 1.0 - pow(1.0 - t, 3.0);
}
`

const schema = {
  progress: { type: 'f32', default: 0, min: 0, max: 1 },
  spread: { type: 'f32', default: 2, min: 0, max: 8 },
  rise: { type: 'f32', default: 14, min: 0, max: 80 },
} as const

/**
 * Letters rise and fade in one after another the first time the element
 * scrolls into view (a glyph material; the DOM text is untouched).
 * Already-visible text is left alone.
 */
export function useTextStagger(
  ref: RefObject<Element | null>,
  { duration = 1.4, spread = 2, rise = 14 }: TextStaggerOptions = {},
) {
  const fx = useFx()

  useEffect(() => {
    const el = ref.current
    if (!fx || !el || prefersReducedMotion() || isInViewport(el)) {
      return
    }

    const stagger = fx.material({
      name: 'text-stagger',
      target: el,
      kinds: ['glyph'],
      params: schema,
      // Hidden until compiled, so letters never flash in at rest first.
      hold: true,
      vertex: /* wgsl */ `${ARRIVE}
        fn vertex(local : vec2f, size : vec2f, uv : vec2f, record : u32) -> vec2f {
          let t = arrive(record);
          return local + vec2f(0.0, (1.0 - t) * params.rise);
        }`,
      fragment: /* wgsl */ `
        fn fragment(m : MatIn) -> vec4f {
          return m.color * arrive(m.record);
        }`,
    })
    stagger.params.spread = spread
    stagger.params.rise = rise

    let anim: { stop: () => void } | null = null
    let done = false
    const stopInView = inView(
      el,
      () => {
        const run = animate(stagger.params, { progress: 1 }, { duration, ease: 'linear' })
        anim = run
        run.then(() => {
          done = true
          stagger.destroy()
        })
        stopInView()
      },
      { amount: 0.3 },
    )

    return () => {
      stopInView()
      anim?.stop()
      if (!done) {
        stagger.destroy()
      }
    }
  }, [fx, ref, duration, spread, rise])
}
