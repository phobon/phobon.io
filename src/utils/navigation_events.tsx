import { useCallback, useEffect, useRef } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { LayoutStore, useLayoutStore } from '@/stores/use_layout_store'
import { wait } from './wait'

const urlStateSelector = ({ urlState, setUrlState }): Pick<LayoutStore, 'urlState' | 'setUrlState'> => ({
  urlState,
  setUrlState,
})

const NavigationEvents = () => {
  const urlKey = useRouterState({
    select: (s) => s.location.pathname + (s.location.searchStr ?? ''),
  })
  const { urlState, setUrlState } = useLayoutStore(urlStateSelector)
  const previousUrl = useRef<string>(null)

  const transition = useCallback(async () => {
    await wait(500)
    setUrlState('transitionIn')
  }, [setUrlState])

  useEffect(() => {
    if (urlKey === previousUrl.current) {
      return
    }

    previousUrl.current = urlKey
    if (urlState === 'transitionInReady') {
      transition()
    }
  }, [urlKey, setUrlState, transition, urlState])

  return null
}

export default NavigationEvents
