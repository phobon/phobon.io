export * from './v6/Project'
export * from './v6/FluidStudy'
export * from './v6/Experience'

import { SlideLink } from './slide_link'
import markdownComponents, { Figure, FigureGrid, ImageGrid, Span, Picture, Paragraph } from './v6/Markdown'

const markdown = {
  ...markdownComponents,
  a: SlideLink,
}

export { Span, Paragraph, markdown, Figure, FigureGrid, ImageGrid, Picture }
