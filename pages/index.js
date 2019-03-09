import React, { useState, useEffect } from "react";
import { Box, Heading, BoxList, BoxListItem } from '@phobon/base';
import { headlines, currently, projects } from './data.json';
import Headline from '../components/Headline';
import { SlideLink } from '../components';

export default () => {
  const [headline, setHeadline] = useState(null);

  useEffect(() => {
    setHeadline(headlines[Math.floor(Math.random() * headlines.length)]);
  }, []);

  const current = currently.map(c => (
    <BoxListItem key={c.target} fontSize={2}>{c.title}, <SlideLink fontSize="inherit" ml={1} href={c.url}>{c.target}</SlideLink></BoxListItem>
  ));
  const project = projects.map(c => (
    <BoxListItem
      key={c.title}
      fontSize={2}
      flexWrap="wrap">
      <SlideLink fontSize="inherit" href={c.url}>{c.title}</SlideLink>,
      <span css={{ marginLeft: '0.5rem' }}>{c.description}</span>
     </BoxListItem>
  ));

  return (
    <React.Fragment>
      <Heading.H1 mb={3} color="grayscale.2">Hi, I'm Ben</Heading.H1>
      <Headline {...headline} mb={6} color="grayscale.3" />

      <Box as="section" flexDirection="column" alignItems="flex-start" mb={5}>
        <Heading.H5 color="accent.3" fontWeight="bold">Currently</Heading.H5>
        <BoxList flexDirection="column" alignItems="flex-start">
          {current}
        </BoxList>
      </Box>

      <Box as="section" flexDirection="column" alignItems="flex-start" mb={5}>
        <Heading.H5 color="accent.3" fontWeight="bold">Things I'm doing</Heading.H5>
        <BoxList flexDirection="column" alignItems="flex-start">
          {project}
        </BoxList>
      </Box>
    </React.Fragment>
  );
};