export * from './v6/Project'
export * from './v6/FluidStudy'
export * from './v6/Experience'

import { SlideLink } from './v6/SlideLink'

import markdownComponents, { Figure, FigureGrid, ImageGrid, Span, Picture, Paragraph } from './v6/Markdown'

const markdown = {
  ...markdownComponents,
  a: SlideLink,
}

export { SlideLink, Span, Paragraph, markdown, Figure, FigureGrid, ImageGrid, Picture }
