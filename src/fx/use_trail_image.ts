import { type RefObject, useEffect } from 'react'

import { useFx, useTrail } from './compositor_provider'

export type TrailImageOptions = {
  /** CSS px the image is dragged per unit of trail. */
  warp?: number
  /** Peak brightening where the trail is strongest, 0..1. */
  light?: number
}

// The element's images, warped along the trail and lit by it: a streak
// that follows the pointer's path and fades with the field.
const FRAGMENT = /* wgsl */ `
fn fragment(m : MatIn) -> vec4f {
  let t = trail_page(m.page);
  let c = mat_sample(-t.xy * params.warp) * m.coverage;
  let l = params.light * clamp(t.z, 0.0, 1.0);
  return vec4f(c.rgb + (vec3f(c.a) - c.rgb) * l, c.a);
}
`

const schema = {
  warp: { type: 'f32', default: 14, min: 0, max: 64 },
  light: { type: 'f32', default: 0.18, min: 0, max: 1 },
} as const

/** Warp and light the element's images along the page's pointer trail. */
export function useTrailImage(ref: RefObject<HTMLElement | null>, { warp = 14, light = 0.18 }: TrailImageOptions = {}) {
  const fx = useFx()
  const trail = useTrail()

  useEffect(() => {
    const el = ref.current
    if (!fx || !trail || !el) {
      return
    }
    const mat = fx.material({
      name: 'trail-image',
      target: el,
      kinds: ['image'],
      trail,
      params: schema,
      fragment: FRAGMENT,
    })
    mat.params.warp = warp
    mat.params.light = light
    return () => mat.destroy()
  }, [fx, trail, ref, warp, light])
}
