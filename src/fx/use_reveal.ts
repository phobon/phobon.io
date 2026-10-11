import type { Motion, Pass } from 'compositor-gpu/fx'
import { animate, inView } from 'motion'
import { type RefObject, useEffect } from 'react'

import { useFx, useFxLib } from './compositor_provider'
import { isInViewport, prefersReducedMotion } from './dom'
import { onReplay, tuning } from './tuning'

export type RevealOptions = {
  /** Position among siblings that enter together (the column): delays the
   * reveal by `order × tuning.reveal.stagger`. */
  order?: number
  /** Selector for the child that blurs (a region pass on the moving element
   * itself would replace its motion). Default: the first element child. */
  blurTarget?: string
}

/**
 * Scale, rise, fade and sharpen an element in on the GPU the first time it
 * scrolls into view. Elements already on screen when the compositor starts
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
    let soft: Pass<{ radius: { type: 'f32'; default: number } }> | null = null
    let running: Array<{ stop: () => void }> = []
    let run = 0
    let stopInView = () => {}

    // At rest the motion and blur are identity: release them so the
    // element stops being isolated.
    const release = () => {
      for (const r of running) {
        r.stop()
      }
      running = []
      soft?.destroy()
      motion?.destroy()
      soft = null
      motion = null
    }
    const prepare = () => {
      release()
      const r = tuning.reveal
      motion = fx.motion(el, { from: { scale: r.scale, y: r.y, opacity: 0 } })
      soft = inner && r.blur > 0 ? lib.blur(fx, { radius: r.blur, region: inner }) : null
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
      if (soft) {
        running.push(animate(soft.params, { radius: 0 }, options))
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
