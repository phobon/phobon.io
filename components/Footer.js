import React from 'react';
import { Grid } from '@phobon/base';
import SlideLink from './SlideLink';
import { links } from '../pages/data.json';

const Footer = props => {
  const linkSet = links.map(l => (
    <SlideLink key={l.label} href={l.url}>{l.label}</SlideLink>
  ));

  return (
    <Grid
      as="footer"
      alignSelf="flex-start"
      py={5}
      fontSize={5}
      gridTemplateRows="1fr"
      gridTemplateColumns={`repeat(${links.length}, auto)`}
      gridGap={6}
      {...props}>
      {linkSet}
    </Grid>
  );
};

export default Footer;