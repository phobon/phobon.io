import { createFileRoute } from '@tanstack/react-router'

import Content from '@/content/writing/how-this-site-works.mdx'

export const Route = createFileRoute('/writing/how-this-site-works')({
  component: HowThisSiteWorksPage,
})

function HowThisSiteWorksPage() {
  return <Content />
}
