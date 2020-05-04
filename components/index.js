import { Header, Footer, Layout } from './Layout';

import SlideLink from './SlideLink';
import Project from './Project';

import markdownComponents, { Figure, FigureGrid, ImageGrid, Span, Picture, Paragraph } from './Markdown';
import FluidStudy from './FluidStudy';
import Experience from './Experience';

import MotionContainer from './MotionContainer';

const markdown = {
  ...markdownComponents,
  a: SlideLink,
};

export {
  Header,
  Footer,
  Layout,
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
  MotionContainer,
};