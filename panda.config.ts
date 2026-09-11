import { defineConfig } from '@pandacss/dev'
import { theme } from '@/design'

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{ts,tsx,js,jsx}'],
  exclude: [],
  theme,
  outdir: 'src/design',
  importMap: '@/design',
})
