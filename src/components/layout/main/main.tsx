import type { ReactNode } from 'react'
import { css } from '@/design/css'
import { cn } from '@/utils/cn'

import { gridStyles } from '../common'

export type MainProps = {
  className?: string
  children: ReactNode
}

export const Main = ({ className, children }: MainProps) => {
  return (
    <main
      className={cn(
        css({
          width: '100%',
          position: 'relative',
          overflow: 'auto',
          touchAction: 'auto',
        }),
        className,
        gridStyles,
        'phbn__main',
      )}
    >
      {children}
    </main>
  )
}
