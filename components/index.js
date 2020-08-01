import { Header, Footer, Layout, Meta } from './Layout';

import SlideLink from './SlideLink';
import Project from './Project';

import markdownComponents, { Figure, FigureGrid, ImageGrid, Span, Picture, Paragraph } from './Markdown';
import FluidStudy from './FluidStudy';
import Experience from './Experience';

const markdown = {
  ...markdownComponents,
  a: SlideLink,
};

export {
  Header,
  Footer,
  Layout,
  Meta,
  SlideLink,
  Project,
  Span,
  Paragraph,
  markdown,
  Figure,
  FigureGrid,
  ImageGrid,
  Picture,
  FluidStudy,
  Experience,
};