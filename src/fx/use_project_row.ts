import type { Material, Motion } from 'compositor-gpu/fx'
import { animate, inView } from 'motion'
import { type RefObject, useEffect } from 'react'

import { useFx } from './compositor_provider'
import { canHover, isInViewport, prefersReducedMotion } from './dom'
import { bindLive, onReplay, tuning } from './tuning'

// Rows that scroll into view in the same frame play one after another:
// each inView callback queues its row, and the next frame starts them
// `tuning.rows.stagger` s apart in the order they were queued (document
// order, as the observer reports them).
const queue: Array<(delay: number) => void> = []
let flushing = false
function enqueue(start: (delay: number) => void) {
  queue.push(start)
  if (flushing) {
    return
  }
  flushing = true
  requestAnimationFrame(() => {
    flushing = false
    queue.splice(0).forEach((fn, i) => fn(i * tuning.rows.stagger))
  })
}

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

/**
 * A Projects list row (`MiniProject`): it rises in when it first scrolls
 * into view (`tuning.rows`), and on hover its `[data-row-title]` letters
 * ripple and its `[data-row-arrow]` nudges right (`tuning.rowHover`). All
 * on the GPU; the DOM doesn't move. Rows on screen at start are left
 * alone; the dials' Replay re-runs the reveal.
 */
export function useProjectRow(ref: RefObject<HTMLElement | null>) {
  const fx = useFx()

  useEffect(() => {
    const el = ref.current
    if (!fx || !el || prefersReducedMotion()) {
      return
    }

    // Reveal.
    let motion: Motion | null = null
    let move: { stop: () => void } | null = null
    let run = 0
    let stopInView = () => {}
    const release = () => {
      move?.stop()
      move = null
      motion?.destroy()
      motion = null
    }
    const prepare = () => {
      release()
      motion = fx.motion(el, { from: { y: tuning.rows.y, opacity: 0 } })
    }
    const play = (delay: number) => {
      if (!motion) {
        return
      }
      const id = ++run
      const a = animate(motion, { progress: [0, 1] }, { ...tuning.rows.transition, delay })
      move = a
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
          enqueue(play)
          stopInView()
        },
        { amount: 0.5 },
      )
    }
    if (!isInViewport(el)) {
      prepare()
      whenInView()
    }
    const offReplay = onReplay('rows', () => {
      stopInView()
      prepare()
      if (isInViewport(el)) {
        enqueue(play)
      } else {
        whenInView()
      }
    })

    // Hover.
    const title = el.querySelector<HTMLElement>('[data-row-title]')
    const arrow = el.querySelector<HTMLElement>('[data-row-arrow]')
    const hover = canHover()
    const nudge = hover && arrow ? fx.transform(arrow) : null
    let nudging: { stop: () => void } | null = null
    // Created disabled: it compiles on first use, and is only on (and
    // re-uploading the row's text) while the ripple plays.
    const ripple: Material<typeof rippleSchema> | null =
      hover && title
        ? fx.material({
            name: 'row-ripple',
            target: title,
            kinds: ['glyph'],
            params: rippleSchema,
            vertex: RIPPLE,
            enabled: false,
          })
        : null
    const unbindRipple = ripple ? bindLive('rowHover', ripple.params) : () => {}
    let rippling: ReturnType<typeof animate> | null = null

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') {
        return
      }
      const h = tuning.rowHover
      if (nudge) {
        nudging?.stop()
        nudging = animate(nudge, { x: h.nudge }, h.spring)
      }
      if (ripple && !rippling) {
        ripple.enabled = true
        const a = animate(ripple.params, { progress: [0, 1] }, { duration: h.duration, ease: 'linear' })
        rippling = a
        a.then(() => {
          if (rippling === a) {
            rippling = null
            ripple.enabled = false
          }
        })
      }
    }
    const onLeave = () => {
      if (nudge) {
        nudging?.stop()
        nudging = animate(nudge, { x: 0 }, tuning.rowHover.spring)
      }
    }
    if (hover) {
      el.addEventListener('pointerenter', onEnter)
      el.addEventListener('pointerleave', onLeave)
    }

    return () => {
      run++
      stopInView()
      offReplay()
      release()
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
      nudging?.stop()
      nudge?.destroy()
      rippling?.stop()
      unbindRipple()
      ripple?.destroy()
    }
  }, [fx, ref])
}
