import React from "react";
import { Heading, Stack, Grid } from '@phobon/base';
import { Spacer } from '@phobon/grimoire';
import { motion } from 'framer-motion';

import { useApi } from '../hooks';
import { SlideLink, Span, FluidStudy, Project, Experience, Meta } from '../components';

const ease = [0.33, 1, 0.68, 1];

const container = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

const motionProps = {
  initial: 'initial',
  animate: 'visible',
};

const MotionStack = motion.custom(Stack);
const MotionHeading1 = motion.custom(Heading.H1);
const MotionGrid = motion.custom(Grid);
const MotionSpacer = motion.custom(Spacer);

const Index = props => {
  const projects = useApi('/api/projects');
  const writing = useApi('/api/writing');
  const experiences = useApi('/api/experiences');

  return (
    <>
      <Meta />
      <MotionStack
        flex={1}
        as="main"
        maxWidth={1400}
        px={5}
        py={[6, 9]}
        space={[6, 9]}
        variants={container}
        initial="hidden"
        animate="visible"
        exit="hidden"
        {...props}>
        <MotionHeading1
          fullWidth
          fontSize={[9, 10]}
          lineHeight={[2, 3]}
          maxWidth={1400}
          mb={[5, 0]}
          color="foreground"
          variants={{
            visible: {
              translateY: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
                delay: 0,
                ease,
              }
            },
            initial: {
              translateY: 16,
              opacity: 0,
            },
          }}
          {...motionProps}>
          Hi, I'm <SlideLink href="https://www.instagram.com/thenoumenon/">Ben</SlideLink>. I'm a <Span color="violets.5">developer</Span> & <Span color="accent.5">designer</Span> based in Perth
        </MotionHeading1>

        {writing && (
          <MotionGrid
            id="writing"
            fullWidth
            as="section"
            alignItems="flex-start"
            gridGap={[7, 0]}
            gridTemplateColumns={['1fr', '2fr auto 1fr']}
            variants={{
              visible: {
                translateY: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                  delay: 0.15,
                  ease,
                }
              },
              initial: {
                translateY: 16,
                opacity: 0,
              },
            }}
            {...motionProps}>
            {writing.map(({key, ...s}) => (
              <React.Fragment key={key}>
                <FluidStudy {...s} />
                <Spacer direction="vertical" mx={5} length="100%" display={['none', 'block']} />
              </React.Fragment>
            ))}
          </MotionGrid>
        )}

        <MotionSpacer
          length="100%"
          variants={{
            visible: {
              opacity: 1,
              transition: {
                duration: 0.3,
                delay: 0.15,
                ease,
              }
            },
            initial: {
              opacity: 0,
            },
          }}
          {...motionProps} />

        {experiences && (
          <MotionStack
            fullWidth
            maxWidth={1400}
            alignSelf="center"
            alignItems="flex-start"
            space={[6, 9]}
            as="section"
            variants={{
              visible: {
                translateY: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                  delay: 0.3,
                  ease,
                }
              },
              initial: {
                opacity: 0,
                translateY: 16,
              },
            }}
            {...motionProps}>
            {experiences.map(({ key, ...e }) => (
              <React.Fragment key={key}>
                <Experience {...e} />
                <Spacer length="100%" />
              </React.Fragment>
            ))}
          </MotionStack>
        )}

        {projects && (
          <MotionGrid
            maxWidth={1400}
            fullWidth
            gridTemplateColumns={['1fr', 'repeat(2, 1fr)']}
            gridAutoRows="auto"
            alignSelf="center"
            gridGap={6}
            as="section"
            variants={{
              visible: {
                translateY: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                  delay: 0.5,
                  ease,
                }
              },
              initial: {
                opacity: 0,
                translateY: 16,
              },
            }}
            {...motionProps}>
            {projects.map(p => (
              <Project key={p.name} project={p} alignSelf="flex-start" />
            ))}
          </MotionGrid>
        )}

        <MotionSpacer
          length="100%"
          variants={{
            visible: {
              opacity: 1,
              transition: {
                duration: 0.3,
                delay: 0.5,
                ease,
              }
            },
            initial: {
              opacity: 0,
            },
          }}
          {...motionProps} />
      </MotionStack>
    </>
  );
}

export default Index;