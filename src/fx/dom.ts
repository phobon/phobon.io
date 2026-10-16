/** True when any part of `el` is inside the viewport right now. */
export function isInViewport(el: Element): boolean {
  const r = el.getBoundingClientRect()
  return r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** A mouse or trackpad that can hover (not touch). */
export function canHover(): boolean {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

/** Expo-ish ease-out used across the site's reveals. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]
