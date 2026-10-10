import { animate, inView } from 'motion'
import { type RefObject, useEffect } from 'react'

import { useFx, useFxLib } from './compositor_provider'
import { EASE_OUT, isInViewport, prefersReducedMotion } from './dom'

export type RevealOptions = {
  /** Seconds before playing once in view (for staggering siblings). */
  delay?: number
  /** Blur radius (CSS px) the content sharpens from, applied to `blurTarget`
   * because a region pass on the moving element would replace its motion. */
  blur?: number
  /** Selector for the child that blurs. Default: the first element child. */
  blurTarget?: string
}

/**
 * Scale, rise, fade and sharpen an element in on the GPU the first time it
 * scrolls into view. Elements already on screen when the compositor starts
 * are left alone, so nothing that was visible disappears.
 */
export function useReveal(
  ref: RefObject<Element | null>,
  { delay = 0, blur: radius = 12, blurTarget }: RevealOptions = {},
) {
  const fx = useFx()
  const lib = useFxLib()

  useEffect(() => {
    const el = ref.current
    if (!fx || !lib || !el || prefersReducedMotion() || isInViewport(el)) {
      return
    }

    const motion = fx.motion(el, { from: { scale: 0.94, y: 56, opacity: 0 } })
    const inner = blurTarget ? el.querySelector(blurTarget) : el.firstElementChild
    const soft = inner && radius > 0 ? lib.blur(fx, { radius, region: inner }) : null
    const running: Array<{ stop: () => void }> = []
    let done = false

    const stopInView = inView(
      el,
      () => {
        const options = { duration: 0.9, delay, ease: EASE_OUT }
        const move = animate(motion, { progress: 1 }, options)
        running.push(move)
        if (soft) {
          running.push(animate(soft.params, { radius: 0 }, options))
        }
        // At rest the motion and blur are identity; release them so the
        // element stops being isolated.
        move.then(() => {
          done = true
          soft?.destroy()
          motion.destroy()
        })
        stopInView()
      },
      { amount: 0.15 },
    )

    return () => {
      stopInView()
      for (const r of running) {
        r.stop()
      }
      if (!done) {
        soft?.destroy()
        motion.destroy()
      }
    }
  }, [fx, lib, ref, delay, radius, blurTarget])
}
