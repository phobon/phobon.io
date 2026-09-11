import { ClientOnly, createRootRoute, Outlet } from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import Main from '@/components/layout/main'
import { NotFoundPage } from '@/components/not_found'

export const Route = createRootRoute({
  notFoundComponent: NotFoundPage,
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
      <ClientOnly>
        <Analytics />
      </ClientOnly>
    </>
  )
}
