import React from 'react';
import { Heading } from 'base';
import SlideLink from './SlideLink';

const Headline = ({ lead, target, url, ...props }) => (
  <Heading.H2 {...props} css={{ verticalAlign: 'bottom' }}><span css={{ verticalAlign: 'inherit', marginRight: '1rem' }}>{lead}</span><SlideLink fontSize="inherit" href={url}>{target}</SlideLink></Heading.H2>
);

export default Headline;