import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { Box, Heading, BoxList, BoxListItem, Link as ExternalLink, Flex } from 'base';
import { headlines, currently, projects } from '../static/data.json';
import Headline from '../components/Headline';

export default () => {
  const [headline, setHeadline] = useState(null);

  useEffect(() => {
    setHeadline(headlines[Math.floor(Math.random() * headlines.length)]);
  }, []);

  const current = currently.map(c => (
    <BoxListItem key={c.target} fontSize={2}>{c.title}, <ExternalLink fontSize="inherit" ml={1} href={c.url}>{c.target}</ExternalLink></BoxListItem>
  ));

  return (
    <React.Fragment>
      <Heading.H1 mb={3} color="grayscale.2">Hi, I'm Ben from Perth</Heading.H1>
      <Headline {...headline} mb={6} color="grayscale.3" />

      <Box as="section" flexDirection="column" alignItems="flex-start" mb={5}>
        <Heading.H5 color="accent.3" fontWeight="bold">Currently</Heading.H5>
        <BoxList flexDirection="column" alignItems="flex-start">
          {current}
        </BoxList>
      </Box>
    </React.Fragment>
  );
};