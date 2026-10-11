import type { Material } from 'compositor-gpu/fx'
import { animate, inView } from 'motion'
import { type RefObject, useEffect } from 'react'

import { useFx } from './compositor_provider'
import { isInViewport, prefersReducedMotion } from './dom'
import { bindLive, onReplay, tuning } from './tuning'

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
 * Already-visible text is left alone. Values come from `tuning.stagger`;
 * the dials' Replay re-runs it.
 */
export function useTextStagger(ref: RefObject<Element | null>) {
  const fx = useFx()

  useEffect(() => {
    const el = ref.current
    if (!fx || !el || prefersReducedMotion()) {
      return
    }

    let mat: Material<typeof schema> | null = null
    let unbind = () => {}
    let anim: { stop: () => void } | null = null
    let run = 0
    let stopInView = () => {}

    const release = () => {
      anim?.stop()
      anim = null
      unbind()
      mat?.destroy()
      mat = null
    }
    const prepare = () => {
      release()
      mat = fx.material({
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
      unbind = bindLive('stagger', mat.params)
    }
    const play = () => {
      if (!mat) {
        return
      }
      const id = ++run
      const a = animate(mat.params, { progress: 1 }, { duration: tuning.stagger.duration, ease: 'linear' })
      anim = a
      a.then(() => {
        if (id === run) {
          release()
        }
      })
    }
    const whenInView = () => {
      stopInView = inView(
        el,
        () => {
          play()
          stopInView()
        },
        { amount: 0.3 },
      )
    }

    if (!isInViewport(el)) {
      prepare()
      whenInView()
    }
    const offReplay = onReplay('stagger', () => {
      stopInView()
      prepare()
      if (isInViewport(el)) {
        play()
      } else {
        whenInView()
      }
    })

    return () => {
      run++
      stopInView()
      offReplay()
      release()
    }
  }, [fx, ref])
}
