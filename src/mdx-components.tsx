import type { MDXComponents } from 'mdx/types'
import markdownComponents from '@/components/markdown'

export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    ...markdownComponents,
    ...components,
  }
}
