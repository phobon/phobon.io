import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { css } from '@/design/css'
import { cn } from '@/helpers/cn'
import { CurrentSection, useSubscribeCurrentSection } from '@/stores/use_infinite_scroll_store'

const ScrollSection = forwardRef<HTMLDivElement, any>(({ className, children, ...props }, ref) => {
  useImperativeHandle(ref, () => sectionRef.current)

  const cb = useCallback((currentSection: CurrentSection) => {
    console.log(currentSection)
  }, [])

  const sectionRef = useSubscribeCurrentSection(cb)

  return (
    <section
      ref={sectionRef}
      className={cn(
        css({
          willChange: 'transform',
        }),
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
})

export default ScrollSection
