import styled from 'styled-components';
import { Text } from '@phobon/base';

const Pre = styled(Text).attrs(() => ({
  as: 'pre',
}))`
  border-radius: ${props => props.theme.radii[4]}px;
  > code {
    font-size: inherit;
    line-height: inherit;
  }
`;

Pre.defaultProps = {
  fontSize: [4, 5],
  lineHeight: 1.8,
  mb: [2, 4],
  bg: 'grayscale.8',
  color: 'grayscale.3',
  px: 3,
  py: 3,
};

export default Pre;