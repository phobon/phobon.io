import { ClientOnly, createRootRoute, Outlet } from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import Main from '@/components/layout/main'
import { NotFoundPage } from '@/components/not_found'
import { CompositorProvider, useSiteConfig } from '@/fx'

export const Route = createRootRoute({
  notFoundComponent: NotFoundPage,
  component: RootComponent,
})

function RootComponent() {
  return (
    <CompositorProvider>
      <SiteConfig />
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

/** Every GPU effect, from src/fx/fx.config.json (needs the provider above
 * it). The on-page editor (Alt+E in dev, `?edit`) edits that file. */
function SiteConfig() {
  useSiteConfig()
  return null
}
