import type { Material, TextStaggerSchema } from 'compositor-gpu/fx'
import { animate, inView } from 'motion'
import { type RefObject, useEffect } from 'react'

import { useFx, useFxLib } from './compositor_provider'
import { isInViewport, prefersReducedMotion } from './dom'
import { bindLive, onReplay, tuning } from './tuning'

/**
 * Letters rise and fade in one after another the first time the element
 * scrolls into view (`lib.textStagger`, a glyph material; the DOM text is
 * untouched).
 * Already-visible text is left alone. Values come from `tuning.stagger`;
 * the dials' Replay re-runs it.
 */
export function useTextStagger(ref: RefObject<Element | null>) {
  const fx = useFx()
  const lib = useFxLib()

  useEffect(() => {
    const el = ref.current
    if (!fx || !lib || !el || prefersReducedMotion()) {
      return
    }

    let mat: Material<TextStaggerSchema> | null = null
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
      mat = lib.textStagger(fx, { target: el })
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
  }, [fx, lib, ref])
}
