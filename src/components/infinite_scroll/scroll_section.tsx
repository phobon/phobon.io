import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useInfiniteScroll } from './infinite_scroll'
import { css } from '@/design/css'
import { cn } from '@/helpers/cn'

const ScrollSection = forwardRef<HTMLDivElement, any>(({ index, className, children, ...props }, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const initialisedRef = useRef(false)
  useImperativeHandle(ref, () => sectionRef.current)

  const { observer } = useInfiniteScroll() || {}
  // useEffect(() => {
  //   const section = sectionRef.current
  //   const initialised = initialisedRef.current
  //   if (!observer || !section || initialised) {
  //     return
  //   }

  //   initialisedRef.current = true

  //   console.log('observe', section)
  //   observer.observe(section)

  //   return () => {
  //     observer.unobserve(section)
  //   }
  // }, [observer])

  return (
    <section
      ref={sectionRef}
      data-scalar={0}
      className={cn(
        css({
          // willChange: 'transform',
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
