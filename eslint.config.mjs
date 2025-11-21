import { defineConfig, globalIgnores } from 'eslint/config'
import next from 'eslint-config-next'
import reactCompiler from 'eslint-plugin-react-compiler'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  globalIgnores(['**/.next', '**/dist', '**/node_modules/', 'src/design/']),
  {
    extends: [...next, ...compat.extends('prettier')],

    plugins: {
      'react-compiler': reactCompiler,
    },

    rules: {
      'import/prefer-default-export': 'off',
      'no-console': 'warn',
      'no-var': 'error',
      'no-html-link-for-pages': 'off',
      'react/display-name': 'off',
      'react-compiler/react-compiler': 'error',
    },
  },
])
