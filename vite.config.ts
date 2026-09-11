import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import type { Plugin } from 'vite'
import { createServer, defineConfig } from 'vite'

function prerenderHome(): Plugin {
  let outDir = 'dist'
  let root = process.cwd()

  return {
    name: 'prerender-home',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
      root = config.root
    },
    async closeBundle() {
      const indexPath = resolve(outDir, 'index.html')
      if (!existsSync(indexPath)) {
        return
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
        const appHtml = await render('/')
        const preloadRe = /<link\s[^>]*rel="preload"[^>]*\/?>/gi
        const preloads = appHtml.match(preloadRe) ?? []
        const bodyHtml = appHtml.replace(preloadRe, '')
        const template = readFileSync(indexPath, 'utf8')
        const marker = '<div id="root" class="phbn__body"></div>'
        if (!template.includes(marker)) {
          throw new Error(`Prerender marker not found in ${indexPath}`)
        }
        let html = template.replace(marker, () => `<div id="root" class="phbn__body">${bodyHtml}</div>`)
        if (preloads.length > 0) {
          html = html.replace('</head>', `    ${preloads.join('\n    ')}\n  </head>`)
        }
        writeFileSync(indexPath, html)
        vite.config.logger.info('Prerendered /')
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
  },
  resolve: {
    tsconfigPaths: true,
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
    prerenderHome(),
  ],
})
