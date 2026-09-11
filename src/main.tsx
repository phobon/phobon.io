import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

import { createAppRouter } from './router'
import '@/global.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

const app = (
  <StrictMode>
    <RouterProvider router={createAppRouter()} />
  </StrictMode>
)

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app)
} else {
  createRoot(rootElement).render(app)
}
