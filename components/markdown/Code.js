import { Text } from '@phobon/base';

const Code = props => (
  <Text
    as="span"
    textStyle="monospace"
    display="inline"
    fontSize={[3, 4]}
    lineHeight="inherit"
    bg="grayscale.8"
    color="grayscale.1"
    px={2}
    py={1}
    css={{ borderRadius: 8 }}
    {...props} />
);

export default Code;