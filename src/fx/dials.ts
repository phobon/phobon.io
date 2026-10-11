import { createDialKit, createDialRoot } from 'dialkit/vanilla'
import 'dialkit/vanilla/styles.css'

import { type Easing, replay, setTuning, tuning } from './tuning'

// Live tuning panel for the GPU effects, loaded only with `?dials=1`
// (compositor_provider.tsx). Values persist in localStorage per panel;
// each panel's Copy button gives the values to paste into tuning.ts.

export function mountDials(): () => void {
  // On <html>, outside the mirrored root (<body>), like the compositor's
  // canvas: replace mode hides <body>'s paint, and the panel isn't mirrored.
  // Above the canvas (z-index 2147483646).
  const host = document.createElement('div')
  Object.assign(host.style, {
    position: 'fixed',
    top: '12px',
    right: '12px',
    width: '300px',
    maxHeight: 'calc(100dvh - 24px)',
    overflow: 'auto',
    zIndex: '2147483647',
  })
  document.documentElement.append(host)
  const root = createDialRoot({ mode: 'inline', target: host, theme: 'dark' })

  const t = tuning
  const kits = [
    createDialKit(
      'Trail',
      {
        radius: [t.trail.radius, 16, 400, 1],
        decay: [t.trail.decay, 0.5, 0.995, 0.005],
        strength: [t.trail.strength, 0, 4, 0.05],
        speed: [t.trail.speed, 100, 6000, 50],
        gamma: [t.trail.gamma, 0.25, 4, 0.05],
      },
      { id: 'fx-trail', persist: true },
    ),
    createDialKit(
      'Trail pass',
      {
        pixel: [t.trailPass.pixel, 0, 1, 1],
        block: [t.trailPass.block, 2, 64, 1],
        push: [t.trailPass.push, 0, 64, 0.5],
        lo: [t.trailPass.lo, 0, 2, 0.01],
        hi: [t.trailPass.hi, 0, 4, 0.01],
        opacity: [t.trailPass.opacity, 0, 1, 0.01],
      },
      { id: 'fx-trail-pass', persist: true, defaultCollapsed: true },
    ),
    createDialKit(
      'Trail images',
      {
        warp: [t.trailImage.warp, 0, 64, 0.5],
        light: [t.trailImage.light, 0, 1, 0.01],
      },
      { id: 'fx-trail-image', persist: true, defaultCollapsed: true },
    ),
    createDialKit(
      'Reveal',
      {
        y: [t.reveal.y, 0, 200, 1],
        scale: [t.reveal.scale, 0.5, 1.2, 0.01],
        blur: [t.reveal.blur, 0, 48, 0.5],
        stagger: [t.reveal.stagger, 0, 0.6, 0.01],
        transition: { type: 'easing', ...t.reveal.transition },
        replay: { type: 'action', label: 'Replay' },
      },
      { id: 'fx-reveal', persist: true, defaultCollapsed: true, onAction: () => replay('reveal') },
    ),
    createDialKit(
      'Tilt',
      {
        shift: [t.tilt.shift, 0, 40, 0.5],
        lean: [t.tilt.lean, 0, 8, 0.1],
        lift: [t.tilt.lift, 1, 1.15, 0.005],
        transition: t.tilt.transition,
      },
      { id: 'fx-tilt', persist: true, defaultCollapsed: true },
    ),
    createDialKit(
      'Intro text',
      {
        duration: [t.stagger.duration, 0.2, 4, 0.05],
        spread: [t.stagger.spread, 0, 8, 0.1],
        rise: [t.stagger.rise, 0, 80, 1],
        replay: { type: 'action', label: 'Replay' },
      },
      { id: 'fx-stagger', persist: true, defaultCollapsed: true, onAction: () => replay('stagger') },
    ),
    createDialKit(
      'Transition',
      {
        block: [t.transition.block, 4, 160, 1],
        width: [t.transition.width, 0.01, 2, 0.01],
        jitter: [t.transition.jitter, 0, 0.9, 0.01],
        exit: { type: 'easing', ...t.transition.exit },
        enter: { type: 'easing', ...t.transition.enter },
        replay: { type: 'action', label: 'Sweep' },
      },
      { id: 'fx-transition', persist: true, defaultCollapsed: true, onAction: () => replay('transition') },
    ),
  ] as const

  const [trail, trailPass, trailImage, reveal, tilt, stagger, transition] = kits
  const offs = [
    trail.subscribe((v) => setTuning('trail', v)),
    trailPass.subscribe((v) => setTuning('trailPass', v)),
    trailImage.subscribe((v) => setTuning('trailImage', v)),
    reveal.subscribe(({ transition, replay: _, ...v }) => {
      const e = transition as unknown as Easing
      setTuning('reveal', { ...v, transition: { duration: e.duration, ease: e.ease } })
    }),
    tilt.subscribe(({ transition, ...v }) => {
      setTuning('tilt', { ...v, transition: transition as typeof tuning.tilt.transition })
    }),
    stagger.subscribe(({ replay: _, ...v }) => setTuning('stagger', v)),
    transition.subscribe(({ exit, enter, replay: _, ...v }) => {
      const x = exit as unknown as Easing
      const n = enter as unknown as Easing
      setTuning('transition', {
        ...v,
        exit: { duration: x.duration, ease: x.ease },
        enter: { duration: n.duration, ease: n.ease },
      })
    }),
  ]

  return () => {
    for (const off of offs) {
      off()
    }
    for (const k of kits) {
      k.destroy()
    }
    root.destroy()
    host.remove()
  }
}
