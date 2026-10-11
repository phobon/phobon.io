// The effects' tunable values in one place. Hooks read them when they
// create effects or start animations; `bindLive` keeps an effect's params
// in step with later changes. The dials panel (`?dials=1`, dials.ts) writes
// here, and its Copy button gives values to paste back as these defaults.

type Bezier = [number, number, number, number]

export type Spring = {
  type: 'spring'
  visualDuration?: number
  bounce?: number
  stiffness?: number
  damping?: number
  mass?: number
}
export type Easing = { duration: number; ease: Bezier }

export const tuning = {
  /** The page's pointer-trail field (fx.trail params). */
  trail: { radius: 120, decay: 0.9, strength: 1, speed: 1800, gamma: 1 },
  /** The page-wide trail pass (useTrailPass). */
  trailPass: { pixel: 1, push: 4, block: 14, lo: 0.08, hi: 0.4, opacity: 1 },
  /** Project images along the trail (useTrailImage). */
  trailImage: { warp: 14, light: 0.18 },
  /** Project tiles scrolling in (useReveal). */
  reveal: {
    y: 56,
    scale: 0.94,
    blur: 12,
    /** Seconds between the two columns. */
    stagger: 0.12,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } as Easing,
  },
  /** Project images under the pointer (useHoverTilt). */
  tilt: {
    shift: 10,
    lean: 1.2,
    lift: 1.025,
    transition: { type: 'spring', visualDuration: 0.35, bounce: 0.25 } as Spring,
  },
  /** The intro paragraph's letters (useTextStagger). */
  stagger: { duration: 1.4, spread: 2, rise: 14 },
}

export type Tuning = typeof tuning
export type Group = keyof Tuning

const live = new Map<Group, Set<Record<string, unknown>>>()
const replays = new Map<Group, Set<() => void>>()

/** Copy `group`'s numeric values into `target` (an effect's params) now
 * and on every change, until the returned function is called. */
export function bindLive(group: Group, target: Record<string, unknown>): () => void {
  apply(target, tuning[group])
  let set = live.get(group)
  if (!set) {
    set = new Set()
    live.set(group, set)
  }
  set.add(target)
  return () => set.delete(target)
}

/** Merge `values` into `group` and push them to its live targets. */
export function setTuning<G extends Group>(group: G, values: Partial<Tuning[G]>): void {
  Object.assign(tuning[group], values)
  for (const t of live.get(group) ?? []) {
    apply(t, tuning[group])
  }
}

/** Run `fn` when the dials ask `group` to replay (one-shot effects). */
export function onReplay(group: Group, fn: () => void): () => void {
  let set = replays.get(group)
  if (!set) {
    set = new Set()
    replays.set(group, set)
  }
  set.add(fn)
  return () => set.delete(fn)
}

export function replay(group: Group): void {
  for (const fn of replays.get(group) ?? []) {
    fn()
  }
}

function apply(target: Record<string, unknown>, values: object): void {
  for (const [k, v] of Object.entries(values)) {
    if (typeof v === 'number' && k in target) {
      target[k] = v
    }
  }
}
