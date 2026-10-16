import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

import { createAppRouter } from './router'
import '@/global.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

const router = createAppRouter()
const app = (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

if (rootElement.hasChildNodes()) {
  router.ssr = { manifest: undefined }
  router.load().then(() => hydrateRoot(rootElement, app))
} else {
  createRoot(rootElement).render(app)
}
