import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import mdx from '@mdx-js/rollup'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
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
    {
      ...(mdx({
        jsxImportSource: 'react',
        providerImportSource: '@mdx-js/react',
      }) as Plugin),
      enforce: 'pre',
    },
    tanstackStart({ srcDirectory: 'src' }),
    viteReact({ include: /\.(jsx|tsx|mdx)$/ }),
    nitro(
      process.env.VERCEL
        ? {
            preset: 'vercel',
          }
        : {},
    ),
  ],
})
