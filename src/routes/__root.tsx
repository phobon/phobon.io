import { ClientOnly, createRootRoute, Outlet } from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import Main from '@/components/layout/main'
import { NotFoundPage } from '@/components/not_found'
import { CompositorProvider, useLoadIntro, usePageTransition, useScrollFx, useTouchTrail, useTrailPass } from '@/fx'

export const Route = createRootRoute({
  notFoundComponent: NotFoundPage,
  component: RootComponent,
})

function RootComponent() {
  return (
    <CompositorProvider>
      <TrailPass />
      <PageTransition />
      <LoadIntro />
      <ScrollFx />
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
      <ClientOnly>
        <Analytics />
      </ClientOnly>
    </CompositorProvider>
  )
}

/** Edge lenses on the viewport (needs the provider above it). */
function ScrollFx() {
  useScrollFx()
  return null
}

/** The page resolving from glitch slices once the GPU takes over (needs the
 * provider above it). */
function LoadIntro() {
  useLoadIntro()
  return null
}

/** Page transitions (needs the provider above it). */
function PageTransition() {
  usePageTransition()
  return null
}

/** The page-wide pointer-trail pass, fed by touch too (needs the provider
 * above it). */
function TrailPass() {
  useTrailPass()
  useTouchTrail()
  return null
}
