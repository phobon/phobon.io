import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'

import { createAppRouter } from './router'

export async function render(url: string) {
  const router = createAppRouter(url)
  await router.load()

  return renderToString(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
