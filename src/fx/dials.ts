import { attachDials, configureDials, type DialSchema } from 'compositor-gpu/dials'

import { type Group, replay, setTuning, type Tuning, tuning } from './tuning'

// Live tuning panels for the GPU effects, loaded only with `?dials=1`
// (compositor_provider.tsx), one panel per tuning group. Values persist in
// localStorage per panel; each panel's Copy button gives the values to
// paste into tuning.ts.

const f = (value: number, min: number, max: number, step: number) =>
  ({ type: 'f32', default: value, min, max, step }) as const

function panel<G extends Group>(
  name: string,
  group: G,
  schema: DialSchema,
  { open = false, action }: { open?: boolean; action?: string } = {},
) {
  return attachDials(
    name,
    null,
    {
      schema,
      onChange: (values) => setTuning(group, values as Partial<Tuning[G]>),
      actions: action ? { [action]: () => replay(group) } : undefined,
    },
    { collapsed: !open },
  )
}

export function mountDials(): () => void {
  configureDials({ theme: 'dark' })
  const t = tuning
  const offs = [
    panel(
      'Trail',
      'trail',
      {
        radius: f(t.trail.radius, 16, 400, 1),
        decay: f(t.trail.decay, 0.5, 0.995, 0.005),
        strength: f(t.trail.strength, 0, 4, 0.05),
        speed: f(t.trail.speed, 100, 6000, 50),
        gamma: f(t.trail.gamma, 0.25, 4, 0.05),
      },
      { open: true },
    ),
    panel('Touch', 'touch', {
      drag: f(t.touch.drag, 0, 4, 0.05),
      tap: f(t.touch.tap, 0, 200, 1),
      tapSpeed: f(t.touch.tapSpeed, 100, 6000, 50),
      spokes: f(t.touch.spokes, 0, 16, 1),
    }),
    panel('Trail pass', 'trailPass', {
      pixel: f(t.trailPass.pixel, 0, 1, 1),
      block: f(t.trailPass.block, 2, 64, 1),
      push: f(t.trailPass.push, 0, 64, 0.5),
      lo: f(t.trailPass.lo, 0, 2, 0.01),
      hi: f(t.trailPass.hi, 0, 4, 0.01),
      opacity: f(t.trailPass.opacity, 0, 1, 0.01),
    }),
    panel('Trail images', 'trailImage', {
      warp: f(t.trailImage.warp, 0, 64, 0.5),
      light: f(t.trailImage.light, 0, 1, 0.01),
    }),
    panel(
      'Reveal',
      'reveal',
      {
        y: f(t.reveal.y, 0, 200, 1),
        scale: f(t.reveal.scale, 0.5, 1.2, 0.01),
        blur: f(t.reveal.blur, 0, 48, 0.5),
        stagger: f(t.reveal.stagger, 0, 0.6, 0.01),
        transition: { type: 'easing', default: t.reveal.transition },
      },
      { action: 'Replay' },
    ),
    panel('Tilt', 'tilt', {
      shift: f(t.tilt.shift, 0, 40, 0.5),
      lean: f(t.tilt.lean, 0, 8, 0.1),
      lift: f(t.tilt.lift, 1, 1.15, 0.005),
      transition: { type: 'spring', default: t.tilt.transition },
    }),
    panel(
      'Intro text',
      'stagger',
      {
        duration: f(t.stagger.duration, 0.2, 4, 0.05),
        spread: f(t.stagger.spread, 0, 8, 0.1),
        rise: f(t.stagger.rise, 0, 80, 1),
      },
      { action: 'Replay' },
    ),
    panel('Edge lens', 'scroll', {
      top: f(t.scroll.top, 0, 0.9, 0.01),
      topBand: f(t.scroll.topBand, 0.05, 0.5, 0.01),
      bottom: f(t.scroll.bottom, 0, 0.9, 0.01),
      bottomBand: f(t.scroll.bottomBand, 0.05, 0.5, 0.01),
    }),
    panel(
      'Rows',
      'rows',
      {
        y: f(t.rows.y, 0, 80, 1),
        stagger: f(t.rows.stagger, 0, 0.3, 0.005),
        transition: { type: 'easing', default: t.rows.transition },
      },
      { action: 'Replay' },
    ),
    panel('Row hover', 'rowHover', {
      lift: f(t.rowHover.lift, 0, 24, 0.5),
      spread: f(t.rowHover.spread, 0, 8, 0.1),
      duration: f(t.rowHover.duration, 0.1, 2, 0.05),
      nudge: f(t.rowHover.nudge, 0, 32, 0.5),
      spring: { type: 'spring', default: t.rowHover.spring },
    }),
    panel(
      'Transition',
      'transition',
      {
        block: f(t.transition.block, 4, 160, 1),
        width: f(t.transition.width, 0.01, 2, 0.01),
        jitter: f(t.transition.jitter, 0, 0.9, 0.01),
        exit: { type: 'easing', default: t.transition.exit },
        enter: { type: 'easing', default: t.transition.enter },
      },
      { action: 'Sweep' },
    ),
  ]

  return () => {
    for (const off of offs) {
      off()
    }
  }
}
