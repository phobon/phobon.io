import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'

import Header from '@/components/layout/header'
import Main from '@/components/layout/main'
import Footer from '@/components/layout/footer'
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
      <Analytics />
    </>
  )
}
