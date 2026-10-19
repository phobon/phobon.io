import type { DevelopSchema, Material, Motion, Pass, RevealSchema } from 'compositor-gpu/fx'
import { animate, inView } from 'motion'
import { type RefObject, useEffect } from 'react'

import { useFx, useFxLib } from './compositor_provider'
import { isInViewport, prefersReducedMotion } from './dom'
import { onReplay, tuning } from './tuning'

export type RevealOptions = {
  /** Position among siblings that enter together (the column): delays the
   * reveal by `order × tuning.reveal.stagger`. */
  order?: number
  /** Selector for the child that glitches in (a region pass on the moving
   * element itself would replace its motion). Default: the first element
   * child. */
  blurTarget?: string
}

/**
 * Scale, rise and fade an element in on the GPU the first time it scrolls
 * into view, while its content sharpens, its colour channels converge and
 * shifted slices settle (lib.reveal) and its images develop from washed-out
 * grey (lib.develop). Elements already on screen when the compositor starts
 * are left alone, so nothing that was visible disappears. Values come from
 * `tuning.reveal`; the dials' Replay re-runs it.
 */
export function useReveal(ref: RefObject<Element | null>, { order = 0, blurTarget }: RevealOptions = {}) {
  const fx = useFx()
  const lib = useFxLib()

  useEffect(() => {
    const el = ref.current
    if (!fx || !lib || !el || prefersReducedMotion()) {
      return
    }
    const inner = blurTarget ? el.querySelector(blurTarget) : el.firstElementChild

    let motion: Motion | null = null
    let soft: Pass<RevealSchema> | null = null
    let dev: Material<DevelopSchema> | null = null
    let running: Array<{ stop: () => void }> = []
    let run = 0
    let stopInView = () => {}

    // At rest the motion, reveal and develop are identity: release them so
    // the element stops being isolated.
    const release = () => {
      for (const r of running) {
        r.stop()
      }
      running = []
      soft?.destroy()
      dev?.destroy()
      motion?.destroy()
      soft = null
      dev = null
      motion = null
    }
    const prepare = () => {
      release()
      const r = tuning.reveal
      motion = fx.motion(el, { from: { scale: r.scale, y: r.y, opacity: 0 } })
      soft = inner
        ? lib.reveal(fx, inner, {
            blur: r.blur,
            split: r.split,
            glitch: r.glitch,
            height: r.height,
            density: r.density,
            // The motion fades the tile; this only keeps it hidden at 0.
            fade: 0.02,
            seed: Math.floor(Math.random() * 1000),
          })
        : null
      dev = el.querySelector('img, video')
        ? lib.develop(fx, { target: el, wash: r.wash, desaturate: r.desaturate, fade: 0.02 })
        : null
    }
    const play = () => {
      if (!motion) {
        return
      }
      const id = ++run
      const r = tuning.reveal
      const options = { ...r.transition, delay: order * r.stagger }
      const move = animate(motion, { progress: 1 }, options)
      running.push(move)
      // Explicit keyframes: Motion keeps its own copy of the last value it
      // animated each key to.
      if (soft) {
        running.push(animate(soft.params, { progress: [0, 1] }, options))
      }
      if (dev) {
        running.push(animate(dev.params, { progress: [0, 1] }, options))
      }
      move.then(() => {
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
        { amount: 0.15 },
      )
    }

    if (!isInViewport(el)) {
      prepare()
      whenInView()
    }
    const offReplay = onReplay('reveal', () => {
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
  }, [fx, lib, ref, order, blurTarget])
}
