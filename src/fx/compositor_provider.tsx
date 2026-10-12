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
 * instead of replacing it, `?reuse=0` turns off scene reuse, `?stats=1`
 * shows the frame profiler HUD (B baseline, R reuse on/off),
 * `?dials=1` the effects' tuning panel (dials.ts).
 */
export function CompositorProvider({ children }: { children: ReactNode }) {
  const q = query()
  const flag = q.get('gpu')
  const undo = useRef(() => {})

  const onReady = (gpu: Gpu | null) => {
    undo.current()
    undo.current = () => {}
    if (!gpu?.trail) {
      return
    }
    let gone = false
    let unmountDials = () => {}
    window.__trail = gpu.trail
    const unbindTrail = bindLive('trail', gpu.trail.params)
    if (q.get('dials') === '1') {
      import('./dials').then(({ mountDials }) => {
        if (!gone) {
          unmountDials = mountDials()
        }
      })
    }
    undo.current = () => {
      gone = true
      unmountDials()
      unbindTrail()
      delete window.__trail
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
      hud={q.get('stats') === '1'}
      onReady={onReady}
    >
      {children}
    </GpuProvider>
  )
}
