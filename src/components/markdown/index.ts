import { Wrapper } from './wrapper'
import { Paragraph } from './paragraph'
import { H1, H2, H3 } from './headings'
import { Code } from './code'
import { Pre } from './pre'
import { Hr } from './hr'
import { Blockquote } from './blockquote'
import { Ul, Li } from './lists'

export * from './figure'
export * from './figure_grid'
export * from './image_grid'
export * from './picture'
export * from './span'

const Markdown = {
  wrapper: Wrapper,
  p: Paragraph,
  h1: H1,
  h2: H2,
  h3: H3,
  inlineCode: Code,
  pre: Pre,
  ul: Ul,
  li: Li,
  hr: Hr,
  blockquote: Blockquote,
}

export default Markdown

export { Paragraph }
