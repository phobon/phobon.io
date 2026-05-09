import { createRouter } from '@tanstack/react-router'
import { NotFoundPage } from '@/components/not_found'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultNotFoundComponent: NotFoundPage,
  })

  return router
}
