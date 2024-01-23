/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react'
import Link from 'next/link'
import { Box } from '@/components/v6/Base/Core'

import { SlideLink } from '@/components/v6/SlideLink'
import { destructureLayoutProps } from '@/components/v6/Base/utils'

export interface NavigationLinkProps {
  id?: string | number
  label?: string
  href?: string
  external?: boolean
  fontSize?: number
}

export const NavigationLink: React.FunctionComponent<NavigationLinkProps & any> = ({
  label,
  href,
  fontSize = 7,
  external = false,
  onClick,
  ...props
}) => {
  const [layoutProps, rest] = destructureLayoutProps(props)

  return (
    <Box css={{ overflow: 'hidden' }} {...layoutProps}>
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
        <Link href={href}>
          <SlideLink as='div' fontSize={fontSize} onClick={onClick} {...rest}>
            {label}
          </SlideLink>
        </Link>
      )}
      {/* </Container> */}
    </Box>
  )
}
