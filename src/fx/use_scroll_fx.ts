import { useEffect } from 'react'

import { useFx } from './compositor_provider'
import { prefersReducedMotion } from './dom'
import { bindLive } from './tuning'

// A lens along the top and bottom edges of the viewport: a band at each
// edge (`topBand` / `bottomBand` × the viewport height) magnifies toward
// that edge's centre by up to `top` / `bottom`, so the page swells as it
// scrolls in and out. The lens fades in from the band's inner edge, so the
// middle of the page is untouched.
const FRAGMENT = /* wgsl */ `
fn edge_lens(p : vec2f, edge_y : f32, e : f32, s : f32, vp : vec2f) -> vec2f {
  let t = smoothstep(0.0, 1.0, clamp(e, 0.0, 1.0));
  let c = vec2f(vp.x * 0.5, edge_y);
  return c + (p - c) * (1.0 - s * t);
}

fn effect(uv : vec2f, src : texture_2d<f32>, smp : sampler) -> vec4f {
  let vp = fx.viewport / fx.dpr;
  let p = uv_to_viewport(uv);
  let hb = max(params.bottomBand * vp.y, 1.0);
  let ht = max(params.topBand * vp.y, 1.0);
  var q = p;
  if (p.y > vp.y - hb) {
    q = edge_lens(p, vp.y, (p.y - (vp.y - hb)) / hb, params.bottom, vp);
  } else if (p.y < ht) {
    q = edge_lens(p, 0.0, (ht - p.y) / ht, params.top, vp);
  } else {
    return sample(uv);
  }
  return sample(viewport_to_uv(clamp(q, vec2f(0.0), vp)));
}
`

const schema = {
  top: { type: 'f32', default: 0.15, min: 0, max: 0.9 },
  topBand: { type: 'f32', default: 0.2, min: 0.05, max: 0.5 },
  bottom: { type: 'f32', default: 0.15, min: 0, max: 0.9 },
  bottomBand: { type: 'f32', default: 0.2, min: 0.05, max: 0.5 },
} as const

/**
 * Edge lenses on the viewport (`tuning.scroll`), on at all times: the page
 * bulges as it enters and leaves at the top and bottom. `?scroll=off`
 * disables it.
 */
export function useScrollFx() {
  const fx = useFx()

  useEffect(() => {
    const flag = new URLSearchParams(window.location.search).get('scroll')
    if (!fx || flag === 'off' || prefersReducedMotion()) {
      return
    }
    const pass = fx.pass({
      name: 'edge-lens',
      params: schema,
      // Samples are clamped to the viewport.
      radius: 0,
      fragment: FRAGMENT,
    })
    const unbind = bindLive('scroll', pass.params)
    return () => {
      unbind()
      pass.destroy()
    }
  }, [fx])
}
