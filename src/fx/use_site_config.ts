import { useRouter } from '@tanstack/react-router'
import type { FxConfig, LiveConfig } from 'compositor-gpu/fx'
import { useGpu } from 'compositor-gpu/react'
import { useEffect, useState } from 'react'

import { siteEffects } from './effects'
import initial from './fx.config.json'

// The site's effects, all from `fx.config.json` (docs/EDITOR.md in
// compositor-gpu): presets and the site's own effects (./effects) on the
// page, or on elements by `data-fx="name"`. The on-page editor (Alt+E or
// `?edit`) writes the file; the HMR handler below hands the new file to
// `update()`, so a save applies without a reload or remount.

// JSON imports type as their literal shape, which FxConfig doesn't overlap.
let config = initial as unknown as FxConfig
const listeners = new Set<(c: FxConfig) => void>()

if (import.meta.hot) {
  import.meta.hot.accept('./fx.config.json', (m) => {
    if (m) {
      config = m.default as FxConfig
      for (const fn of listeners) {
        fn(config)
      }
    }
  })
}

/**
 * Registers the site's effects and applies the config once the
 * compositor's handoff completes (`compositor.ready`), so `load` triggers
 * play on the GPU page rather than under the prerendered one, and an
 * `enter` effect on something already in view lands at once. Elements are
 * matched again after each route change.
 */
export function useSiteConfig(): LiveConfig | null {
  const gpu = useGpu()
  const router = useRouter()
  const [live, setLive] = useState<LiveConfig | null>(null)

  useEffect(() => {
    if (!gpu) {
      return
    }
    const { compositor, fx, lib, trail } = gpu
    const offs = siteEffects({ lib, trail, router }).map((d) => lib.registerEffect(d))
    let gone = false
    let l: LiveConfig | null = null
    void compositor.ready.then(() => {
      if (gone) {
        return
      }
      l = lib.applyConfig(fx, config)
      setLive(l)
    })
    return () => {
      gone = true
      l?.destroy()
      setLive(null)
      for (const off of offs) {
        off()
      }
    }
  }, [gpu, router])

  useEffect(() => {
    if (!live) {
      return
    }
    const onChange = (c: FxConfig) => live.update(c)
    onChange(config)
    listeners.add(onChange)
    // New routes mount new elements: match again once they've rendered.
    let raf = 0
    const off = router.subscribe('onResolved', () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => live.resolve())
    })
    return () => {
      listeners.delete(onChange)
      off()
      cancelAnimationFrame(raf)
    }
  }, [live, router])

  return live
}
