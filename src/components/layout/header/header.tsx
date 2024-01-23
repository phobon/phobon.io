/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React, { useCallback } from 'react'
import { Button } from '@/components/v6/Base/Button'
import { Spacer } from '@/components/v6/Base/Spacer'
import Link from 'next/link'
import { navigationLinks } from '@/data/links'

import { getTheme } from '@/hooks/getTheme'

import { Identity } from '@/components/v6/Identity'
import { HamburgerGlyph, SunGlyph, MoonGlyph } from '@/components/v6/Glyphs'
import { NavigationLink } from '@/components/layout/navigation'
import { Stack } from '@/components/v6/Base/Core/Stack'
import { Box } from '@/components/v6/Base/Core/Box'
import { useTheme } from '@/hooks/index'

export const Header = ({ px, openNavigation, ...props }) => {
  const [theme, setTheme] = useTheme('light', getTheme)
  const toggleTheme = useCallback(() => setTheme(theme === 'light' ? 'dark' : 'light'), [theme, setTheme])

  return (
    <Stack
      fullWidth
      css={(theme: any) => ({
        top: 0,
        position: 'sticky',
        zIndex: 2,
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: theme.colors.background,
          opacity: 0.7,
          zIndex: -1,
        },
      })}
      {...props}
    >
      <Box as='header' fullWidth py={[4, 5]} px={px} justifyContent='space-between' display={['none', 'flex']}>
        <Link href='/'>
          <Identity aria-label='Go home' />
        </Link>
        <Stack as='nav' space={3} alignItems='center' flexDirection='row'>
          {navigationLinks.slice(1).map(({ id, ...rest }) => (
            <NavigationLink key={id} id={id} fontSize={5} {...rest} />
          ))}

          <Button onClick={toggleTheme} aria-label='Toggle Theme' size='m' shape='square'>
            {theme === 'light' ? <MoonGlyph /> : <SunGlyph />}
          </Button>
        </Stack>
      </Box>

      <Box as='header' fullWidth py={[4, 5]} px={px} justifyContent='space-between' display={['flex', 'none']}>
        <Button aria-label='Open menu' variant='tertiary' shape='square' onClick={() => openNavigation()}>
          <HamburgerGlyph />
        </Button>

        <Link href='/'>
          <Identity aria-label='Go home' />
        </Link>

        <Button onClick={toggleTheme} aria-label='Toggle Theme' size='m' shape='square'>
          {theme === 'light' ? <MoonGlyph /> : <SunGlyph />}
        </Button>
      </Box>

      <Box px={px} fullWidth>
        <Spacer length='100%' />
      </Box>
    </Stack>
  )
}
