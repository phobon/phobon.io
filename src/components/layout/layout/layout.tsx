import React, { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useOnKeyPress } from '@/hooks/index'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Navigation } from '@/components/layout/navigation'

import { maxWidth, horizontalPadding } from '@/data/constants'

export type LayoutProps = React.PropsWithChildren<{
  title?: string
}>

export const Layout: React.FunctionComponent<LayoutProps> = ({ title, children }) => {
  const [navigationOpen, setNavigationOpen] = useState<boolean>(() => false)
  useOnKeyPress('.', null, () => setNavigationOpen(true))
  useOnKeyPress('Escape', null, () => {
    setNavigationOpen(false)
  })

  const openNavigation = useCallback(() => setNavigationOpen(true), [])
  const closeNavigation = useCallback(() => setNavigationOpen(false), [])

  return (
    <React.Fragment>
      <Header key='header' title={title} maxWidth={maxWidth} px={horizontalPadding} openNavigation={openNavigation} />
      {children}
      <Footer key='footer' maxWidth={maxWidth} px={horizontalPadding} />

      <AnimatePresence mode='wait'>
        {navigationOpen && (
          <Navigation
            fullWidth
            fullHeight
            position='fixed'
            left={0}
            top={0}
            bg='background'
            zIndex={2}
            px={horizontalPadding}
            closeNavigation={closeNavigation}
          />
        )}
      </AnimatePresence>
    </React.Fragment>
  )
}
