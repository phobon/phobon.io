import { useTouchTrail as useLibTouchTrail } from 'compositor-gpu/react'

import { bindLive } from './tuning'

/**
 * Feeds the page's trail from touch (`lib.touchTrail`), where
 * `trail.pointer` is off: a finger's path leaves a trail, scrolling drags
 * included, and a tap a radial burst. Values come from `tuning.touch`.
 * Mouse and trackpad input is left to the trail's own pointer tracking.
 */
export function useTouchTrail() {
  useLibTouchTrail({ bind: (p) => bindLive('touch', p) })
}
