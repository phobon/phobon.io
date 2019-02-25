import React from 'react';
import styled from 'styled-components';
import { Box, Heading, Link as ExternalLink } from 'base';

const FullScreenContainer = styled(Box)`
  display: inline-block;

  &::before {
    content: '';
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    background: blue;
    opacity: 0;
    transition: opacity 180ms ease-out;
    pointer-events: none;
  }

  &:hover {
    &::before {
      opacity: 0.5;
    }
  }
`;

const FullScreenLink = ({ href, children, ...props }) => (
  <FullScreenContainer {...props}>
    <ExternalLink fontSize="inherit" href={href}>{children}</ExternalLink>
  </FullScreenContainer>
);

const Headline = ({ lead, target, url, ...props }) => (
  <Heading.H2 {...props}><span></span>{lead}<FullScreenLink fontSize="inherit" ml={2} href={url}>{target}</FullScreenLink></Heading.H2>
);

export default Headline;