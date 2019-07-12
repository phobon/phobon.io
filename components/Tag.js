import styled from 'styled-components';
import { space, color, fontSize, lineHeight } from 'styled-system';

const Tag = styled.div`
  ${color}
  ${space}
  ${fontSize}
  ${lineHeight}

  max-width: 26rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  border-radius: ${props => props.theme.radii[3]}px;
`;

Tag.displayName = 'Tag';

Tag.defaultProps = {
  color: 'foreground',
  bg: 'grayscale.5',
  lineHeight: 1.8,
  fontSize: 0,
  py: '1px',
  px: 2,
};

Tag.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
};

export default Tag;