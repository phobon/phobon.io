import { motion } from 'framer-motion';
import styled from 'styled-components';
import { color } from 'styled-system';

const MotionBox = styled(motion.div)({
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  color,
);

const ease = [0.6, -0.05, 0.01, 0.99];

const childBoxStyles = {
  position: 'absolute',
  left: 0,
  top: 0,
};

const container = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

const motionProps = {
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
};

const MotionContainer = ({ children, ...props }) => (
  <MotionBox
    style={{ overflow: 'hidden' }}
    variants={container}
    {...props}
    {...motionProps}>
    <MotionBox
      bg="grayscale.7"
      style={childBoxStyles}
      variants={{
        visible: {
          translateY: 0,
          transition: {
            duration: 0.5,
            delay: 0,
            ease,
          }
        },
        hidden: {
          translateY: '100%',
        },
      }}
      {...motionProps} />
    <MotionBox
      bg="background"
      style={childBoxStyles}
      variants={{
        visible: {
          translateY: 0,
          transition: {
            duration: 0.5,
            delay: 0.13,
            ease,
          }
        },
        hidden: {
          translateY: '100%',
          ease,
        },
      }}
      {...motionProps} />
    <MotionBox
      style={childBoxStyles}
      variants={{
        visible: {
          opacity: 1,
          translateY: 0,
          transition: {
            duration: 1,
            delay: 0.55,
          }
        },
        hidden: {
          opacity: 0,
          translateY: -12,
        },
      }}
      {...motionProps}>
      {children}
    </MotionBox>
  </MotionBox>
);

export default MotionContainer;