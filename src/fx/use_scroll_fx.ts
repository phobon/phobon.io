import { useEdgeLens } from 'compositor-gpu/react'

import { bindLive } from './tuning'

/**
 * Edge lenses on the viewport (`lib.edgeLens`, `tuning.scroll`), on at all
 * times: the page bulges as it enters and leaves at the top and bottom.
 * `?scroll=off` disables it.
 */
export function useScrollFx() {
  const off = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('scroll') === 'off'
  useEdgeLens({ enabled: !off, bind: (p) => bindLive('scroll', p) })
}
