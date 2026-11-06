import type { AnyRouter } from '@tanstack/react-router'
import type { EffectDef, ParamSchema, Trail } from 'compositor-gpu/fx'
import type { FxLibrary } from 'compositor-gpu/react'

/** What the site's own effects are made with (use_site_config.ts). */
export interface SiteFx {
  lib: FxLibrary
  /** The provider's pointer trail, when it has one. */
  trail: Trail | null
  router: AnyRouter
}

export type SiteEffect = (ctx: SiteFx) => EffectDef | null

type Bezier = [number, number, number, number]

/** A vec4 param as a Motion cubic-bezier. */
export const bezier = (v: unknown): Bezier => {
  const a = Array.isArray(v) ? v : []
  return [a[0] ?? 0.25, a[1] ?? 0.1, a[2] ?? 0.25, a[3] ?? 1]
}

/** Plain params initialised from a schema's defaults. */
export function defaults<S extends ParamSchema>(schema: S): Record<keyof S & string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [k, d] of Object.entries(schema)) {
    out[k] = Array.isArray(d.default) ? [...d.default] : d.default
  }
  return out as Record<keyof S & string, unknown>
}

/** Define `keys` on `params` as reads and writes through to `target`. */
export function forward(params: Record<string, unknown>, target: Record<string, unknown>, keys: readonly string[]) {
  for (const k of keys) {
    Object.defineProperty(params, k, {
      enumerable: true,
      configurable: true,
      get: () => target[k],
      set: (v: unknown) => {
        target[k] = v
      },
    })
  }
}
