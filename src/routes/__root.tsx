import { ClientOnly, createRootRoute, Outlet } from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import Main from '@/components/layout/main'
import { NotFoundPage } from '@/components/not_found'
import { CompositorProvider, useTrailPass } from '@/fx'

export const Route = createRootRoute({
  notFoundComponent: NotFoundPage,
  component: RootComponent,
})

function RootComponent() {
  return (
    <CompositorProvider>
      <TrailPass />
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

/** The page-wide pointer-trail pass (needs the provider above it). */
function TrailPass() {
  useTrailPass()
  return null
}
