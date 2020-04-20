import styled from 'styled-components';
import { space } from 'styled-system';

const Hr = styled.hr`
  ${space}
  border-width: 2px;
  border-style: solid;
  width: 5%;
  border-color: ${props => props.theme.colors.accent[9]};
`;

Hr.defaultProps = {
  my: 5,
};

export default Hr;