import type { Trail } from 'compositor-gpu/fx'

import type { SiteEffect } from './context'

// Effects over the provider's pointer trail: the field itself, touch
// input into it, the page-wide pass it drives and project images warped
// along it. None exists without a trail.

const PAGE = ['page'] as const
const ELEMENT = ['element'] as const

/** The trail field's params (radius, decay, strength, speed, gamma). The
 * provider owns the trail: destroying this leaves it running. */
export const trailField: SiteEffect = ({ trail }) =>
  trail && {
    id: 'trail',
    label: 'Trail field',
    scopes: PAGE,
    schema: trail.schema,
    create: () => ({
      params: trail.params,
      get enabled() {
        return trail.enabled
      },
      set enabled(v: boolean) {
        trail.enabled = v
      },
      destroy() {},
    }),
  }

/** Touch input into the trail (lib.touchTrail): a finger's path leaves a
 * trail, scrolling drags included, and a tap a radial burst. Mouse and
 * trackpad input is the trail's own pointer tracking. */
export const touchTrail: SiteEffect = ({ lib, trail }) => {
  if (!trail) {
    return null
  }
  const probe = lib.touchTrail(trail)
  const schema = probe.schema
  probe.destroy()
  return {
    id: 'touchTrail',
    label: 'Touch trail',
    scopes: PAGE,
    schema,
    create() {
      let touch: ReturnType<typeof lib.touchTrail> | null = lib.touchTrail(trail)
      const params = { ...touch.params } as Record<string, unknown>
      const sync = () => {
        if (touch) {
          Object.assign(touch.params, params)
        }
      }
      const live: Record<string, unknown> = {}
      for (const k of Object.keys(params)) {
        Object.defineProperty(live, k, {
          enumerable: true,
          get: () => params[k],
          set: (v: unknown) => {
            params[k] = v
            sync()
          },
        })
      }
      return {
        params: live,
        get enabled() {
          return touch !== null
        },
        set enabled(v: boolean) {
          if (v && !touch) {
            touch = lib.touchTrail(trail)
            sync()
          } else if (!v && touch) {
            touch.destroy()
            touch = null
          }
        },
        destroy() {
          touch?.destroy()
          touch = null
        },
      }
    },
  }
}

// The whole page, read through the trail: inside the trail the scene is
// pixellated into `block`-px squares (each square samples its centre) and
// pushed back along the stroke's direction. `lo`/`hi` map the trail's
// amount to how much of the block shows, so the trail's soft edge becomes
// a ragged edge of blocks. `pixel` 0 with a larger `push` displaces only.
const PAGE_FRAGMENT = /* wgsl */ `
fn effect(uv : vec2f, src : texture_2d<f32>, smp : sampler) -> vec4f {
  let p = uv_to_viewport(uv);
  let b = max(params.block, 1.0);
  let centre = floor(p / b) * b + b * 0.5;
  let t = trail_at(p);
  let base = sample(viewport_to_uv(p - t.xy * params.push));
  let k = smoothstep(params.lo, params.hi, trail_at(centre).z) * params.pixel;
  if (k <= 0.0) {
    return base;
  }
  let block = sample(viewport_to_uv(centre - t.xy * params.push));
  return mix(base, block, step(0.5, k) * params.opacity);
}
`

const pageSchema = {
  pixel: { type: 'f32', default: 1, min: 0, max: 1 },
  push: { type: 'f32', default: 4, min: 0, max: 64 },
  block: { type: 'f32', default: 14, min: 2, max: 64 },
  lo: { type: 'f32', default: 0.08, min: 0, max: 2 },
  hi: { type: 'f32', default: 0.4, min: 0, max: 4 },
  opacity: { type: 'f32', default: 1, min: 0, max: 1 },
} as const

/** A page-wide pass driven by the trail. The pass itself is on only while
 * the trail holds something, so an idle page renders straight to the
 * canvas with no offscreen chain. */
export const trailPage: SiteEffect = ({ trail }) =>
  trail && {
    id: 'trailPage',
    label: 'Trail page',
    scopes: PAGE,
    schema: pageSchema,
    create(fx) {
      const pass = fx.pass({
        name: 'trail-page',
        trail,
        params: pageSchema,
        // Samples up to 4 × push px away (the field's amount tops out at 4).
        radius: (p) => p.push * 4,
        fragment: PAGE_FRAGMENT,
        enabled: false,
      })
      return follow(trail, pass)
    },
  }

/** Keep `pass` on with the trail: on with the first move, off once the
 * trail has been empty for a moment (the field fills on the compositor's
 * next frame). */
function follow(trail: Trail, pass: { params: object; enabled: boolean; destroy(): void }) {
  let allowed = true
  let raf = 0
  let idleSince = 0
  const tick = (now: number) => {
    raf = 0
    if (trail.active) {
      idleSince = 0
    } else if (!idleSince) {
      idleSince = now
    } else if (now - idleSince > 250) {
      pass.enabled = false
      return
    }
    raf = requestAnimationFrame(tick)
  }
  const wake = () => {
    if (!allowed) {
      return
    }
    pass.enabled = true
    idleSince = 0
    raf ||= requestAnimationFrame(tick)
  }
  const onMove = () => {
    if (trail.pointer) {
      wake()
    }
  }
  // Touch input reaches the trail through the touchTrail effect's strokes.
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('touchstart', wake, { passive: true })
  window.addEventListener('touchmove', wake, { passive: true })
  return {
    params: pass.params as Record<string, unknown>,
    get enabled() {
      return allowed
    },
    set enabled(v: boolean) {
      allowed = v
      if (!v) {
        cancelAnimationFrame(raf)
        raf = 0
        pass.enabled = false
      }
    },
    destroy() {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('touchstart', wake)
      window.removeEventListener('touchmove', wake)
      cancelAnimationFrame(raf)
      pass.destroy()
    },
  }
}

// The element's images, warped along the trail and lit by it: a streak
// that follows the pointer's path and fades with the field.
const IMAGE_FRAGMENT = /* wgsl */ `
fn fragment(m : MatIn) -> vec4f {
  let t = trail_page(m.page);
  let c = mat_sample(-t.xy * params.warp) * m.coverage;
  let l = params.light * clamp(t.z, 0.0, 1.0);
  return vec4f(c.rgb + (vec3f(c.a) - c.rgb) * l, c.a);
}
`

const imageSchema = {
  warp: { type: 'f32', default: 14, min: 0, max: 64 },
  light: { type: 'f32', default: 0.18, min: 0, max: 1 },
} as const

/** Warp and light an element's images along the trail. */
export const trailImage: SiteEffect = ({ trail }) =>
  trail && {
    id: 'trailImage',
    label: 'Trail image',
    scopes: ELEMENT,
    schema: imageSchema,
    create(fx, el) {
      if (!el) {
        throw new Error('trailImage needs an element')
      }
      const mat = fx.material({
        name: 'trail-image',
        target: el,
        kinds: ['image'],
        trail,
        params: imageSchema,
        fragment: IMAGE_FRAGMENT,
      })
      return mat
    },
  }
