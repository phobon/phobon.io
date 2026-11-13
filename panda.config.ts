import { defineConfig } from '@pandacss/dev'
import { theme } from './src/design/index.ts'

export default defineConfig({
  // v2 no longer adds preset-base implicitly (conditions, utilities,
  // shorthands like px/pb).
  presets: ['@pandacss/preset-base'],
  preflight: true,
  include: ['./src/**/*.{ts,tsx,js,jsx}'],
  exclude: [],
  theme,
  outdir: 'src/design',
  importMap: '@/design',
})
