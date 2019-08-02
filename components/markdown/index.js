import Table from './Table';
import Paragraph from './Paragraph';
import { H1, H2, H3 } from './Headings';
import Code from './Code';
import Pre from './Pre';
import Hr from './Hr';

import { Ul, Li } from './Lists';

import Figure from './Figure';
import FigureGrid from './FigureGrid';

export default {
  p: Paragraph,
  h1: H1,
  h2: H2,
  h3: H3,
  table: Table,
  inlineCode: Code,
  pre: Pre,
  ul: Ul,
  li: Li,
  hr: Hr,
}

// Named export for Figure and FigureGrid as we shouldn't use it in the default export.
export { Figure, FigureGrid };