import type { EffectDef } from 'compositor-gpu/fx'

import type { SiteFx } from './context'
import { hoverTilt } from './hover_tilt'
import { pageTransition } from './page_transition'
import { rowHover } from './row_hover'
import { touchTrail, trailField, trailImage, trailPage } from './trail'

export type { SiteFx } from './context'

/** The site's own effects, registered next to the presets so the config
 * and the editor can name them. Trail effects need the provider's trail. */
export function siteEffects(ctx: SiteFx): EffectDef[] {
  return [trailField, touchTrail, trailPage, trailImage, hoverTilt, rowHover, pageTransition]
    .map((make) => make(ctx))
    .filter((d): d is EffectDef => d !== null)
}
