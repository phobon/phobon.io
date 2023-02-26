export * from "./Layout";
export * from "./Project";
export * from "./FluidStudy";
export * from "./Experience";

import { SlideLink } from "./SlideLink";

import markdownComponents, {
  Figure,
  FigureGrid,
  ImageGrid,
  Span,
  Picture,
  Paragraph,
} from "./Markdown";

const markdown = {
  ...markdownComponents,
  a: SlideLink,
};

export {
  SlideLink,
  Span,
  Paragraph,
  markdown,
  Figure,
  FigureGrid,
  ImageGrid,
  Picture,
};
