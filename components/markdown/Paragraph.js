import styled from 'styled-components';
import { Text } from '@phobon/base';

const Paragraph = styled(Text).attrs(() => ({
  as: 'p',
}))``;

Paragraph.defaultProps = {
  fontSize: [4, 5],
  lineHeight: 1.8,
  color: 'foreground',
  mt: 0,
  mb: 5,
};

export default Paragraph;