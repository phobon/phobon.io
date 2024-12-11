'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { LayoutStore, useLayoutStore } from '@/stores/use_layout_store'
import { wait } from './wait'

const urlStateSelector = ({ urlState, setUrlState }): Pick<LayoutStore, 'urlState' | 'setUrlState'> => ({
  urlState,
  setUrlState,
})

const NavigationEvents = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { urlState, setUrlState } = useLayoutStore(urlStateSelector)
  const previousUrl = useRef<string>(null)

  const transition = async () => {
    await wait(500)
    setUrlState('transitionIn')
  }

  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    if (url === previousUrl.current) {
      return
    }

    previousUrl.current = url
    if (urlState === 'transitionInReady') {
      transition()
    }
  }, [pathname, searchParams, setUrlState, transition, urlState])

  return null
}

export default NavigationEvents
