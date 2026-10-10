import { animate } from 'motion'
import { type RefObject, useEffect } from 'react'

import { useFx } from './compositor_provider'
import { canHover } from './dom'

export type CursorLightOptions = {
  /** CSS px of the light's falloff. */
  radius?: number
  /** Peak brightening, 0..1. */
  intensity?: number
}

// Screen-blends white over the element's images around the eased pointer
// follower. `amount` fades the light in and out on hover.
const FRAGMENT = /* wgsl */ `
fn fragment(m : MatIn) -> vec4f {
  let p = pointer.follow + fx.scroll;
  let d = distance(m.page, p);
  let k = 1.0 - smoothstep(0.0, params.radius, d);
  let light = params.amount * params.intensity * k * k;
  return vec4f(m.color.rgb + (vec3f(m.color.a) - m.color.rgb) * light, m.color.a);
}
`

const schema = {
  amount: { type: 'f32', default: 0, min: 0, max: 1 },
  radius: { type: 'f32', default: 280, min: 16, max: 1200 },
  intensity: { type: 'f32', default: 0.22, min: 0, max: 1 },
} as const

/** A soft light that follows the pointer across the element's images. */
export function useCursorLight(
  ref: RefObject<HTMLElement | null>,
  { radius = 280, intensity = 0.22 }: CursorLightOptions = {},
) {
  const fx = useFx()

  useEffect(() => {
    const el = ref.current
    if (!fx || !el || !canHover()) {
      return
    }

    const light = fx.material({
      name: 'cursor-light',
      target: el,
      kinds: ['image'],
      fragment: FRAGMENT,
      params: schema,
      enabled: false,
    })
    light.params.radius = radius
    light.params.intensity = intensity

    let anim: { stop: () => void } | null = null
    const onEnter = () => {
      anim?.stop()
      light.enabled = true
      anim = animate(light.params, { amount: 1 }, { duration: 0.35, ease: 'easeOut' })
    }
    const onLeave = () => {
      anim?.stop()
      const out = animate(light.params, { amount: 0 }, { duration: 0.5, ease: 'easeOut' })
      anim = out
      out.then(() => {
        if (anim === out) {
          light.enabled = false
        }
      })
    }

    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
      anim?.stop()
      light.destroy()
    }
  }, [fx, ref, radius, intensity])
}
