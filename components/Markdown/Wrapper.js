import React from 'react';
import { motion } from 'framer-motion';
import { Stack } from '@phobon/base';

const MotionStack = motion.custom(Stack);

const motionProps = {
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
};

const Wrapper = ({ children, ...props }) => (
  <MotionStack
    flex={1}
    as="main"
    maxWidth={1400}
    px={5}
    py={[6, 9]}
    alignItems="flex-start"
    variants={{
      visible: {
        translateY: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: [0.33, 1, 0.68, 1],
        }
      },
      hidden: {
        opacity: 0,
        translateY: 16,
        transition: {
          duration: 0.4,
          ease: [0.33, 1, 0.68, 1],
        }
      },
    }}
    {...motionProps}
    {...props}>
    {children}
  </MotionStack>
);

export default Wrapper;