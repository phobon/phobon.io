import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'
import type { Compositor } from 'compositor-gpu'
import type * as FxLib from 'compositor-gpu/fx'
import type { Effects, Trail } from 'compositor-gpu/fx'

/** `lib` is the dynamically imported `compositor-gpu/fx` module (presets
 * etc.), so nothing from the library lands in the main bundle. `trail` is
 * the page's one pointer-trail field, shared by every trail effect. */
export type Gpu = {
  compositor: Compositor
  fx: Effects
  lib: typeof FxLib
  trail: Trail
}

const GpuContext = createContext<Gpu | null>(null)

declare global {
  interface Window {
    __gpu?: Compositor
    __trail?: Trail
  }
}

/**
 * Mirrors the page onto WebGPU with compositor-gpu (replace mode: the DOM
 * keeps layout, hit-testing and a11y, the GPU paints). Client-only: the
 * library is imported dynamically after hydration, so SSR/prerender and
 * browsers without WebGPU get the plain page.
 *
 * Query flags: `?gpu=0` disables it, `?gpu=overlay` paints over the DOM
 * instead of replacing it, `?stats=1` shows the frame profiler HUD.
 */
export function CompositorProvider({ children }: { children: ReactNode }) {
  const [gpu, setGpu] = useState<Gpu | null>(null)

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const flag = query.get('gpu')
    if (flag === '0' || !('gpu' in navigator)) {
      return
    }

    let cancelled = false
    let compositor: Compositor | null = null
    let fx: Effects | null = null

    Promise.all([import('compositor-gpu'), import('compositor-gpu/fx')])
      .then(async ([{ createCompositor }, lib]) => {
        compositor = await createCompositor({
          root: document.body,
          mode: flag === 'overlay' ? 'overlay' : 'replace',
          fonts: 'auto',
        })
        if (cancelled || !compositor.active) {
          compositor.destroy()
          compositor = null
          return
        }
        fx = lib.createEffects(compositor)
        const trail = fx.trail({ cell: 16, radius: 120, decay: 0.9, speed: 1800 })
        // Touch moves are scrolls: only a mouse or trackpad paints the trail.
        trail.pointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
        compositor.start()
        window.__gpu = compositor
        window.__trail = trail
        if (query.get('stats') === '1') {
          compositor.profile.hud()
        }
        setGpu({ compositor, fx, lib, trail })
      })
      .catch((error: unknown) => {
        console.warn('compositor-gpu failed to start', error)
      })

    return () => {
      cancelled = true
      fx?.release()
      compositor?.destroy()
      if (window.__gpu === compositor) {
        delete window.__gpu
        delete window.__trail
      }
      setGpu(null)
    }
  }, [])

  return <GpuContext value={gpu}>{children}</GpuContext>
}

/** The effects runtime once the compositor is running; null before that,
 * during SSR and without WebGPU. */
export function useFx(): Effects | null {
  return useContext(GpuContext)?.fx ?? null
}

/** The `compositor-gpu/fx` module (presets such as `blur`), once loaded. */
export function useFxLib(): typeof FxLib | null {
  return useContext(GpuContext)?.lib ?? null
}

/** The page's pointer trail (see `fx.trail`), once running. */
export function useTrail(): Trail | null {
  return useContext(GpuContext)?.trail ?? null
}

export function useCompositor(): Compositor | null {
  return useContext(GpuContext)?.compositor ?? null
}
