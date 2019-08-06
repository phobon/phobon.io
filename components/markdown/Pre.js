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
  fontSize: [3, 4],
  lineHeight: 1.8,
  mt: 0,
  mb: 5,
  bg: 'grayscale.1',
  color: 'grayscale.9',
  px: 3,
  py: 2,
};

export default Pre;