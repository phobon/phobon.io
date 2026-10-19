import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import type { Plugin } from 'vite'
import { createServer, defineConfig } from 'vite'

// Prerendered pages: the home page into index.html, and the router's
// not-found page into 404.html. Vercel serves 404.html (status 404) for
// paths with no file, so an unknown URL hydrates the markup it was served
// instead of the home page's (React #418). `vite preview` does the same.
const PAGES = [
  { url: '/', file: 'index.html' },
  { url: '/__not-found', file: '404.html' },
]

function prerenderPages(): Plugin {
  let outDir = 'dist'
  let root = process.cwd()

  return {
    name: 'prerender-pages',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
      root = config.root
    },
    configurePreviewServer(server) {
      // Unknown page paths get 404.html, as on Vercel (assets 404 as usual).
      server.middlewares.use((req, res, next) => {
        const path = (req.url ?? '/').split('?')[0] ?? '/'
        const page = resolve(outDir, '404.html')
        const accept = req.headers.accept ?? ''
        if (
          path === '/' ||
          path.startsWith('/cdn/') ||
          !accept.includes('text/html') ||
          existsSync(resolve(outDir, `.${path}`)) ||
          !existsSync(page)
        ) {
          next()
          return
        }
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html')
        res.end(readFileSync(page))
      })
    },
    async closeBundle() {
      const indexPath = resolve(outDir, 'index.html')
      if (!existsSync(indexPath)) {
        return
      }
      const template = readFileSync(indexPath, 'utf8')
      const marker = '<div id="root" class="phbn__body"></div>'
      if (!template.includes(marker)) {
        throw new Error(`Prerender marker not found in ${indexPath}`)
      }

      const vite = await createServer({
        root,
        server: { middlewareMode: true },
        appType: 'custom',
      })

      try {
        const { render } = (await vite.ssrLoadModule('/src/entry-server.tsx')) as {
          render: (url: string) => Promise<string>
        }
        const preloadRe = /<link\s[^>]*rel="preload"[^>]*\/?>/gi
        for (const { url, file } of PAGES) {
          const appHtml = await render(url)
          const preloads = appHtml.match(preloadRe) ?? []
          const bodyHtml = appHtml.replace(preloadRe, '')
          let html = template.replace(marker, () => `<div id="root" class="phbn__body">${bodyHtml}</div>`)
          if (preloads.length > 0) {
            html = html.replace('</head>', `    ${preloads.join('\n    ')}\n  </head>`)
          }
          writeFileSync(resolve(outDir, file), html)
          vite.config.logger.info(`Prerendered ${url} -> ${file}`)
        }
      } finally {
        await vite.close()
      }
    },
  }
}

export default defineConfig({
  define: {
    __SITE_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  server: {
    port: 3000,
    // Same-origin image paths (see vercel.json): WebGPU can only upload
    // CORS-clean images, and CloudFront drops its CORS header on requests
    // that carry Chrome's `priority` header.
    proxy: {
      '/cdn': {
        target: 'https://d1zi50u3vxu38i.cloudfront.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn/, ''),
      },
    },
  },
  preview: {
    proxy: {
      '/cdn': {
        target: 'https://d1zi50u3vxu38i.cloudfront.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn/, ''),
      },
    },
  },
  optimizeDeps: {
    // Don't crawl compositor-gpu's playground pages for dependencies.
    entries: ['index.html'],
  },
  resolve: {
    tsconfigPaths: true,
    // compositor-gpu/react imports react from the submodule's source: one
    // copy even if the submodule has its own node_modules.
    dedupe: ['react', 'react-dom'],
  },
  build: {
    rollupOptions: {
      plugins: [
        ...(process.env.ANALYZE === 'true'
          ? [visualizer({ filename: 'dist/stats.html', gzipSize: true, open: false })]
          : []),
      ],
    },
  },
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      quoteStyle: 'single',
    }),
    viteReact(),
    prerenderPages(),
  ],
})
