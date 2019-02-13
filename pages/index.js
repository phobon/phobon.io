import React from "react";
import Link from 'next/link'
import { Box, Heading, BoxList, BoxListItem, Link as ExternalLink, Flex } from 'base';

export default () => (
  <React.Fragment>
    <Heading.H1 mb={3} color="grayscale.1">Hi, I'm Ben</Heading.H1>
    <Heading.H2 mb={6} color="grayscale.3">I really like design, development and dogs</Heading.H2>

    <Box as="section" flexDirection="column" alignItems="flex-start" mb={5}>
      <Heading.H5 color="accent.3" fontWeight="bold">Currently</Heading.H5>
      <BoxList flexDirection="column" alignItems="flex-start">
        <BoxListItem>Senior UX Engineer, <ExternalLink ml={1}>Agworld</ExternalLink></BoxListItem>
        <BoxListItem>Designer, <ExternalLink ml={1}>The Studio</ExternalLink></BoxListItem>
        <BoxListItem>Proud dog dad of <ExternalLink ml={1}>Kodi</ExternalLink></BoxListItem>
      </BoxList>
    </Box>

    <Box as="section" flexDirection="column" alignItems="flex-start">
      <Heading.H5 color="accent.3" fontWeight="bold">Previously</Heading.H5>
      <BoxList flexDirection="column" alignItems="flex-start">
        <BoxListItem>UX Engineer, <ExternalLink ml={1}>acQuire</ExternalLink></BoxListItem>
      </BoxList>
    </Box>
    
  </React.Fragment>
);