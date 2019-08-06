import styled from 'styled-components';
import { space } from 'styled-system';

const Blockquote = styled.blockquote`
  position: relative;
  ${space}

  &::before {
    position: absolute;
    left: -3rem;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: ${props => props.theme.colors.accent[8]};
    content: '';
  }

  > * {
    margin-bottom: 0;
    font-style: italic;
    color: ${props => props.theme.colors.grayscale[3]};
  }
`;

Blockquote.defaultProps = {
  mb: 6,
};

export default Blockquote;