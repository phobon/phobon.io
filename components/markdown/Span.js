import styled from 'styled-components';
import { Box } from '@phobon/base';

const Span = styled(Box).attrs(() => ({ as: 'span' }))``;

Span.defaultProps = {
  lineHeight: 'inherit',
  display: 'inline-flex',
};

export default Span;