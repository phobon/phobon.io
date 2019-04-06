import React from 'react';
import { BoxList, BoxListItem } from '@phobon/base';
import SlideLink from './SlideLink';
import { links } from '../pages/data.json';

const Footer = props => {
  const linkSet = links.map(l => (
    <BoxListItem key={l.label} mr={5} mb={3}>
      <SlideLink href={l.url}>{l.label}</SlideLink>
    </BoxListItem>
  ));

  return (
    <BoxList
      as="footer"
      flexDirection={['column', 'row']}
      justifyContent="flex-start"
      alignItems="flex-start"
      alignSelf="flex-start"
      pt={5}
      pb={3}
      fontSize={5}
      gridGap={[3, 6]}
      {...props}>
      {linkSet}
    </BoxList>
  );
};

export default Footer;