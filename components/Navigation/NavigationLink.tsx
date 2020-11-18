/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Box, destructureLayoutProps } from "@phobon/base";

import { SlideLink } from "../SlideLink";

const Container = styled(motion.div)({
  transformOrigin: "0 0",
});

const easeIn = [0.5, 0.21, 0.32, 1];
const easeOut = [0.71, 0.04, 0.45, 0.91];

export interface NavigationLinkProps {
  id?: string | number;
  label?: string;
  href?: string;
  external?: boolean;
  fontSize?: number;
}

export const NavigationLink: React.FunctionComponent<
  NavigationLinkProps & any
> = ({
  id,
  label,
  href,
  fontSize = 7,
  external = false,
  onClick,
  ...props
}) => {
  const [layoutProps, rest] = destructureLayoutProps(props);

  return (
    <Box css={{ overflow: "hidden" }} {...layoutProps}>
      {/* <Container
        variants={{
          visible: {
            translateY: 0,
            skewY: 0,
            transition: {
              ease: easeIn,
            },
          },
          hidden: {
            translateY: '100%',
            skewY: 40,
            transition: {
              ease: easeIn,
            },
          },
          exit: {
            opacity: 0,
            translateY: '-100%',
            transition: {
              ease: easeOut,
            },
          },
        }}> */}
      {external ? (
        <SlideLink href={href} fontSize={fontSize} {...rest}>
          {label}
        </SlideLink>
      ) : (
        <Link href={href} passHref>
          <SlideLink fontSize={fontSize} onClick={onClick} {...rest}>
            {label}
          </SlideLink>
        </Link>
      )}
      {/* </Container> */}
    </Box>
  );
};
