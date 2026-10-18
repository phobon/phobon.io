import type { GlitchSlicesSchema, Pass, RgbSplitSchema } from 'compositor-gpu/fx'
import { animate } from 'motion'
import { useEffect } from 'react'

import { useCompositor, useFx, useFxLib } from './compositor_provider'
import { prefersReducedMotion } from './dom'
import { onReplay, tuning } from './tuning'

/**
 * The page settling in once the GPU takes over: shifted horizontal slices
 * (lib.glitchSlices) and a red/blue split (lib.rgbSplit) over the whole
 * viewport, falling to nothing over `tuning.intro.transition`. It starts
 * when the compositor's handoff completes, so the prerendered page never
 * disappears: it reads as the page resolving rather than arriving.
 * `?intro=off` disables it; the dials' Replay re-runs it.
 */
export function useLoadIntro() {
  const fx = useFx()
  const lib = useFxLib()
  const compositor = useCompositor()

  useEffect(() => {
    const flag = new URLSearchParams(window.location.search).get('intro')
    if (!fx || !lib || !compositor || flag === 'off' || prefersReducedMotion()) {
      return
    }
    let gone = false
    let run = 0
    let slices: Pass<GlitchSlicesSchema> | null = null
    let split: Pass<RgbSplitSchema> | null = null
    let anim: { stop: () => void } | null = null

    const release = () => {
      anim?.stop()
      anim = null
      slices?.destroy()
      split?.destroy()
      slices = null
      split = null
    }
    const play = () => {
      release()
      const id = ++run
      const t = tuning.intro
      const g = lib.glitchSlices(fx, {
        amount: t.glitch,
        split: t.split,
        height: t.height,
        density: t.density,
        rate: 20,
      })
      const s = lib.rgbSplit(fx, { amount: t.split, reach: 600 })
      slices = g
      split = s
      const a = animate(1, 0, {
        ...t.transition,
        onUpdate: (v) => {
          g.params.amount = t.glitch * v
          g.params.split = t.split * v
          s.params.amount = t.split * v
        },
      })
      anim = a
      void a.then(() => {
        if (id === run) {
          release()
        }
      })
    }

    void compositor.ready.then(() => {
      if (!gone) {
        play()
      }
    })
    const offReplay = onReplay('intro', play)

    return () => {
      gone = true
      run++
      offReplay()
      release()
    }
  }, [fx, lib, compositor])
}
