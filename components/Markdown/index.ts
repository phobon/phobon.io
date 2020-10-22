import { Table } from "@phobon/base";

import { Main } from "@/components/Layout/Main";

import { Paragraph } from "./Paragraph";
import { H1, H2, H3 } from "./Headings";
import { Code } from "./Code";
import { Pre } from "./Pre";
import { Hr } from "./Hr";
import { Blockquote } from "./Blockquote";
import { Ul, Li } from "./Lists";

export * from "./Figure";
export * from "./FigureGrid";
export * from "./ImageGrid";
export * from "./Picture";
export * from "./Span";

export default {
  wrapper: Main,
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
  blockquote: Blockquote,
};

export { Paragraph };
