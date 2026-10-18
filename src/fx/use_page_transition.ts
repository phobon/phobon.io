import { useRouter } from '@tanstack/react-router'
import { animate } from 'motion'
import { useEffect } from 'react'

import { useFx, useFxLib } from './compositor_provider'
import { prefersReducedMotion } from './dom'
import { bindLive, type Easing, onReplay, tuning } from './tuning'

// Page transitions as one fullscreen pass: a wave travels out from an
// origin (the click, or the top-left corner) and pixellates the
// page in a grid. The front advances one `block`-px cell at a time, with a
// per-cell jitter so its edge is ragged. Behind the front:
//   cover (mode 0)  cells grow to `block` px and then switch to the page
//                   background one by one: the page is gone (exit).
//   sweep (mode 1)  cells grow and shrink back: the page resolves behind
//                   the wave (back/forward, and feedback for new-tab links).
// Covering then running progress back to 0 uncovers the new page.
const FRAGMENT = /* wgsl */ `
fn cell_hash(c : vec2f) -> f32 {
  return fract(sin(dot(c, vec2f(12.9898, 78.233))) * 43758.5453);
}

fn effect(uv : vec2f, src : texture_2d<f32>, smp : sampler) -> vec4f {
  let p = uv_to_viewport(uv);
  let vp = fx.viewport / fx.dpr;
  let o = vec2f(params.ox, params.oy);
  let far = max(
    max(length(o), length(o - vec2f(vp.x, 0.0))),
    max(length(o - vec2f(0.0, vp.y)), length(o - vp))
  );
  let big = max(params.block, 2.0);
  let coarse = floor(p / big);
  let j = clamp(params.jitter, 0.0, 0.9);
  // 0 at the origin's cell, 1 at the farthest corner's.
  let d = length((coarse + 0.5) * big - o) / max(far, 1.0) * (1.0 - j)
    + cell_hash(coarse) * j;
  let w = max(params.width, 0.01);
  let x = clamp((params.progress * (1.0 + w) - d) / w, 0.0, 1.0);
  var c = x;
  if (params.mode > 0.5) {
    c = 1.0 - abs(2.0 * x - 1.0);
  }
  if (c <= 0.0) {
    return sample(uv);
  }
  if (params.mode < 0.5 && c > 0.55 + 0.4 * cell_hash(coarse + 17.0)) {
    return vec4f(params.bg.rgb, 1.0);
  }
  // Four cell sizes up to block, so cells snap rather than scale.
  let size = max(big * ceil(c * 4.0) / 4.0, 1.0);
  return sample(viewport_to_uv((floor(p / size) + 0.5) * size));
}
`

const schema = {
  progress: { type: 'f32', default: 0, min: 0, max: 1 },
  mode: { type: 'f32', default: 0, min: 0, max: 1 },
  ox: { type: 'f32', default: 0, min: -1e5, max: 1e5 },
  oy: { type: 'f32', default: 0, min: -1e5, max: 1e5 },
  block: { type: 'f32', default: 48, min: 4, max: 160 },
  width: { type: 'f32', default: 0.35, min: 0.01, max: 2 },
  jitter: { type: 'f32', default: 0.12, min: 0, max: 0.9 },
  bg: { type: 'color', default: '#ffffff' },
} as const

const COVER = 0
const SWEEP = 1

type Point = { x: number; y: number }

const frames = (n: number) =>
  new Promise<void>((resolve) => {
    const step = () => (--n <= 0 ? resolve() : requestAnimationFrame(step))
    requestAnimationFrame(step)
  })

/** The page background the cover ends on (body, else html, else white),
 * as 0..1 RGBA: color params take hex or components, and computed styles
 * are rgb()/color() strings, so a 1×1 canvas resolves it. */
function pageBackground(): number[] {
  const g = document.createElement('canvas').getContext('2d', { willReadFrequently: true })
  for (const el of [document.body, document.documentElement]) {
    const c = getComputedStyle(el).backgroundColor
    if (!g || !c) {
      continue
    }
    g.clearRect(0, 0, 1, 1)
    g.fillStyle = c
    g.fillRect(0, 0, 1, 1)
    const [r = 0, gr = 0, b = 0, a = 0] = g.getImageData(0, 0, 1, 1).data
    if (a === 255) {
      return [r / 255, gr / 255, b / 255, 1]
    }
  }
  return [1, 1, 1, 1]
}

/** Where a click came from: the pointer, or the link's centre for a
 * keyboard activation (clientX/Y 0). */
function clickPoint(e: MouseEvent, a: Element): Point {
  if (e.clientX !== 0 || e.clientY !== 0) {
    return { x: e.clientX, y: e.clientY }
  }
  const r = a.getBoundingClientRect()
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
}

/**
 * Page transitions:
 * - in-site links (index ↔ 404) hold a snapshot of the page, navigate, and
 *   reveal the new page in a circle growing from the click, its edge bent
 *   and colour-split (lib.radialReveal, `tuning.navReveal`); with
 *   `?transition=grid` they cover from the click, navigate and uncover in
 *   the pixel grid instead;
 * - same-tab external links cover, then leave; new-tab links (the project
 *   cards) get a sweep from the click and open at once, since a delayed
 *   window open is blocked as a popup.
 * Modified clicks, downloads, mailto:/tel: and `data-no-transition` links
 * are left alone. `?transition=off` disables it. Nothing plays on load:
 * the prerendered page is on screen well before the compositor takes over,
 * so an entry would read as a pulse over a page that had already loaded.
 */
export function usePageTransition() {
  const fx = useFx()
  const lib = useFxLib()
  const router = useRouter()

  useEffect(() => {
    const flag = new URLSearchParams(window.location.search).get('transition')
    if (!fx || !lib || flag === 'off' || prefersReducedMotion()) {
      return
    }
    const nav = flag === 'grid' ? null : lib.radialReveal(fx, { fromPointer: false })
    const unbindNav = nav ? bindLive('navReveal', nav.params) : () => {}
    const pass = fx.pass({
      name: 'page-transition',
      params: schema,
      // Cells sample their centre, up to block / 2 px away.
      radius: (p) => p.block,
      fragment: FRAGMENT,
      enabled: false,
    })
    const unbind = bindLive('transition', pass.params)
    pass.params.bg = pageBackground()

    let running: ReturnType<typeof animate> | null = null
    let busy = false
    let disposed = false

    const run = (mode: number, from: number, to: number, at: Point, t: Easing): Promise<void> => {
      running?.stop()
      pass.params.mode = mode
      pass.params.ox = at.x
      pass.params.oy = at.y
      pass.params.progress = from
      pass.enabled = true
      // Explicit keyframes: Motion keeps its own copy of the last value it
      // animated each key to and wouldn't see the write above.
      const a = animate(pass.params, { progress: [from, to] }, t)
      running = a
      return a.then(() => {
        if (running !== a) {
          return
        }
        running = null
        // A held cover stays on until it is run back to 0.
        if (mode === SWEEP || to === 0) {
          pass.enabled = false
        }
      })
    }
    const sweep = (at: Point) => run(SWEEP, 0, 1, at, tuning.transition.enter)

    const onClick = (e: MouseEvent) => {
      if (busy || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return
      }
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a || a.hasAttribute('download') || a.hasAttribute('data-no-transition')) {
        return
      }
      const url = new URL(a.href, window.location.href)
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return
      }
      const at = clickPoint(e, a)
      if (a.target && a.target !== '_self') {
        void sweep(at)
        return
      }
      const here = window.location
      if (url.origin === here.origin && url.pathname === here.pathname && url.search === here.search) {
        // Same page (a hash link): no transition.
        return
      }
      // Ours from here: keep the router's Link handler from navigating too.
      e.preventDefault()
      e.stopPropagation()
      busy = true
      if (nav && url.origin === here.origin) {
        void (async () => {
          try {
            nav.params.center = [at.x / window.innerWidth, at.y / window.innerHeight]
            await nav.capture()
            if (disposed) {
              return
            }
            await router.navigate({ href: url.pathname + url.search + url.hash })
            // Shows only the snapshot until the new page's mirror is complete.
            await nav.settled()
            if (disposed) {
              return
            }
            await animate(nav.params, { progress: [0, 1] }, tuning.navReveal.transition)
          } finally {
            if (!disposed) {
              nav.end()
            }
            busy = false
          }
        })()
        return
      }
      const t = tuning.transition
      void run(COVER, 0, 1, at, t.exit).then(async () => {
        if (disposed) {
          return
        }
        if (url.origin !== here.origin) {
          window.location.assign(url.href)
          return
        }
        try {
          await router.navigate({ href: url.pathname + url.search + url.hash })
          // React commits, then the compositor re-reads the new page.
          await frames(3)
        } finally {
          busy = false
        }
        if (!disposed) {
          await run(COVER, 1, 0, at, t.enter)
        }
      })
    }

    // Back/forward between routes: no exit to play, sweep the new page in.
    const offResolved = router.subscribe('onResolved', (e) => {
      if (!busy && e.pathChanged && e.fromLocation) {
        void frames(3).then(() => sweep({ x: 0, y: 0 }))
      }
    })
    // Returning through the back/forward cache after a same-tab exit: the
    // page was left covered.
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        running?.stop()
        running = null
        busy = false
        pass.params.progress = 0
        pass.enabled = false
      }
    }
    const offReplay = onReplay('transition', () => void sweep({ x: 0, y: 0 }))

    window.addEventListener('click', onClick, true)
    window.addEventListener('pageshow', onShow)

    return () => {
      disposed = true
      window.removeEventListener('click', onClick, true)
      window.removeEventListener('pageshow', onShow)
      offResolved()
      offReplay()
      running?.stop()
      unbind()
      unbindNav()
      pass.destroy()
      nav?.destroy()
    }
  }, [fx, lib, router])
}
