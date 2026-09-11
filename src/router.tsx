import { createRouter } from '@tanstack/react-router'

import { NotFoundPage } from '@/components/not_found'
import { routeTree } from './routeTree.gen'

export const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultNotFoundComponent: NotFoundPage,
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
