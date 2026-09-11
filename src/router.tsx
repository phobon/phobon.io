import { createMemoryHistory, createRouter } from '@tanstack/react-router'

import { NotFoundPage } from '@/components/not_found'
import { routeTree } from './routeTree.gen'

export function createAppRouter(url?: string) {
  return createRouter({
    routeTree,
    ...(url !== undefined ? { history: createMemoryHistory({ initialEntries: [url] }) } : {}),
    scrollRestoration: false,
    defaultNotFoundComponent: NotFoundPage,
    defaultPreload: 'intent',
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createAppRouter>
  }
}
