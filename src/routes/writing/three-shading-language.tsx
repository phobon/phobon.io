import { createFileRoute } from '@tanstack/react-router'

import Content from '@/content/writing/three-shading-language.mdx'

export const Route = createFileRoute('/writing/three-shading-language')({
  component: ThreeShadingLanguagePage,
})

function ThreeShadingLanguagePage() {
  return <Content />
}
