import type { Trail } from 'compositor-gpu/fx'
import { type Gpu, CompositorProvider as GpuProvider } from 'compositor-gpu/react'
import { type ReactNode, useRef } from 'react'

import { bindLive, tuning } from './tuning'

export { useCompositor, useFx, useFxLib, useGpu, useTrail } from 'compositor-gpu/react'

declare global {
  interface Window {
    __trail?: Trail
  }
}

const query = () => new URLSearchParams(typeof window === 'undefined' ? '' : window.location.search)

/**
 * Mirrors the page onto WebGPU with compositor-gpu (replace mode: the DOM
 * keeps layout, hit-testing and a11y, the GPU paints), with one pointer
 * trail shared by the trail effects. Client-only: SSR/prerender and
 * browsers without WebGPU get the plain page.
 *
 * Query flags: `?gpu=0` disables it, `?gpu=overlay` paints over the DOM
 * instead of replacing it, `?reuse=0` turns off scene reuse.
 *
 * Debug panel (compositor-gpu/debug, bottom-right GPU button): in dev, or
 * with `?debug` in production. It toggles the frame profiler HUD (B
 * baseline, R reuse on/off), the effects' tuning panels (dials.ts) and
 * the skeleton view; toggles persist in localStorage, and `?stats=1`,
 * `?dials=1`, `?skeleton=1` (or `=0`) override them.
 */
export function CompositorProvider({ children }: { children: ReactNode }) {
  const q = query()
  const flag = q.get('gpu')
  const undo = useRef(() => {})

  const onReady = (gpu: Gpu | null) => {
    undo.current()
    undo.current = () => {}
    if (!gpu) {
      return
    }
    let gone = false
    let unmountDebug = () => {}
    if (import.meta.env.DEV || q.has('debug')) {
      // Dials register always; the panel's toggle decides whether they show
      // (DialKit loads only then).
      Promise.all([import('compositor-gpu/debug'), import('./dials')]).then(([{ mountDebugPanel }, { mountDials }]) => {
        if (gone) {
          return
        }
        const unmountDials = mountDials()
        const panel = mountDebugPanel(gpu.compositor)
        unmountDebug = () => {
          panel.destroy()
          unmountDials()
        }
      })
    }
    const trail = gpu.trail
    if (trail) {
      window.__trail = trail
    }
    const unbindTrail = trail ? bindLive('trail', trail.params) : () => {}
    undo.current = () => {
      gone = true
      unmountDebug()
      unbindTrail()
      if (trail) {
        delete window.__trail
      }
    }
  }

  return (
    <GpuProvider
      enabled={flag !== '0'}
      options={{
        mode: flag === 'overlay' ? 'overlay' : 'replace',
        fonts: 'auto',
        // The edge lens (useScrollFx) is fixed to the viewport: a
        // viewport-pinned canvas keeps it locked to the edges while
        // scrolling. Without it the page-anchored canvas never lags.
        canvasPin: q.get('scroll') === 'off' ? 'page' : 'viewport',
        // `?reuse=0`: redraw the scene every frame, for comparing (the
        // stats HUD's R key switches it live).
        sceneReuse: q.get('reuse') !== '0',
      }}
      trail={{ cell: 16, ...tuning.trail }}
      onReady={onReady}
    >
      {children}
    </GpuProvider>
  )
}
