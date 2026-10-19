import { useEffect } from 'react'

import { useFx, useTrail } from './compositor_provider'
import { prefersReducedMotion } from './dom'
import { bindLive, setTuning } from './tuning'

const MODES: Record<string, { pixel: number; push: number }> = {
  // Blocks along the trail, with a small push so they feel dragged.
  pixel: { pixel: 1, push: 4 },
  // Content pushed back along the stroke, no blocks.
  displace: { pixel: 0, push: 22 },
}

// The whole page, read through the trail: inside the trail the scene is
// pixellated into `block`-px squares (each square samples its centre) and
// pushed back along the stroke's direction. `lo`/`hi` map the trail's
// amount to how much of the block shows, so the trail's soft edge becomes
// a ragged edge of blocks.
const FRAGMENT = /* wgsl */ `
fn effect(uv : vec2f, src : texture_2d<f32>, smp : sampler) -> vec4f {
  let p = uv_to_viewport(uv);
  let b = max(params.block, 1.0);
  let centre = floor(p / b) * b + b * 0.5;
  let t = trail_at(p);
  let base = sample(viewport_to_uv(p - t.xy * params.push));
  let k = smoothstep(params.lo, params.hi, trail_at(centre).z) * params.pixel;
  if (k <= 0.0) {
    return base;
  }
  let block = sample(viewport_to_uv(centre - t.xy * params.push));
  return mix(base, block, step(0.5, k) * params.opacity);
}
`

const schema = {
  pixel: { type: 'f32', default: 1, min: 0, max: 1 },
  push: { type: 'f32', default: 4, min: 0, max: 64 },
  block: { type: 'f32', default: 14, min: 2, max: 64 },
  lo: { type: 'f32', default: 0.08, min: 0, max: 2 },
  hi: { type: 'f32', default: 0.4, min: 0, max: 4 },
  opacity: { type: 'f32', default: 1, min: 0, max: 1 },
} as const

/**
 * A page-wide pass driven by the pointer trail (`tuning.trailPass`). It's
 * only enabled while the trail holds something, so an idle page renders
 * straight to the canvas with no offscreen chain. `?trail=pixel|displace`
 * applies a preset; `?trail=off` turns it off.
 */
export function useTrailPass() {
  const fx = useFx()
  const trail = useTrail()

  useEffect(() => {
    const flag = new URLSearchParams(window.location.search).get('trail')
    if (!fx || !trail || flag === 'off' || prefersReducedMotion()) {
      return
    }
    const pass = fx.pass({
      name: 'trail-page',
      trail,
      params: schema,
      // Samples up to 4 × push px away (the field's amount tops out at 4).
      radius: (p) => p.push * 4,
      fragment: FRAGMENT,
      enabled: false,
    })
    const preset = flag ? MODES[flag] : undefined
    if (preset) {
      setTuning('trailPass', preset)
    }
    const unbind = bindLive('trailPass', pass.params)

    // Follow the trail's lifetime: on with the first move, off once it has
    // been empty for a moment (the field fills on the compositor's next frame).
    let raf = 0
    let idleSince = 0
    const tick = (now: number) => {
      raf = 0
      if (trail.active) {
        idleSince = 0
      } else if (!idleSince) {
        idleSince = now
      } else if (now - idleSince > 250) {
        pass.enabled = false
        return
      }
      raf = requestAnimationFrame(tick)
    }
    const wake = () => {
      pass.enabled = true
      idleSince = 0
      raf ||= requestAnimationFrame(tick)
    }
    const onMove = () => {
      if (trail.pointer) {
        wake()
      }
    }
    // Touch input reaches the trail through useTouchTrail's strokes.
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('touchstart', wake, { passive: true })
    window.addEventListener('touchmove', wake, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('touchstart', wake)
      window.removeEventListener('touchmove', wake)
      cancelAnimationFrame(raf)
      unbind()
      pass.destroy()
    }
  }, [fx, trail])
}
