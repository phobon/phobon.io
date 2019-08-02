import Header from './Header';
import Footer from './Footer';
import Layout from './Layout';
import SlideLink from './SlideLink';
import { Project, Projects } from './Projects';
import Span from './Span';
import Toggle from './Toggle';

import markdownComponents, { Figure, FigureGrid } from './markdown';
import Paragraph from './markdown/Paragraph';

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
  Projects,
  Span,
  Paragraph,
  Toggle,
  markdown,
  Figure,
  FigureGrid,
};