import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
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
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      quoteStyle: 'single',
    }),
    viteReact(),
  ],
})
