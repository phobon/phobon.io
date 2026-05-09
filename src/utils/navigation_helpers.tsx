import { useCallback } from 'react'
import { useNavigate, useRouterState } from '@tanstack/react-router'
import { LayoutStore, useLayoutStore } from '@/stores/use_layout_store'
import { wait } from './wait'

const urlStateSelector = ({
  setUrlState,
  transitionOptions,
}): Pick<LayoutStore, 'setUrlState' | 'transitionOptions'> => ({ setUrlState, transitionOptions })

export const Link = ({ href, children, ...props }) => {
  const { setUrlState, transitionOptions } = useLayoutStore(urlStateSelector)
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  // Trigger a transition
  const onClick = useCallback(
    async (e) => {
      e.preventDefault()
      e.stopPropagation()

      // Prevent a click on the current page from triggering a transition
      if (pathname === href) {
        return
      }

      const { duration, stagger } = transitionOptions
      const totalDuration = (duration + stagger * 4) * 1000

      setUrlState('transitionOut')
      await wait(totalDuration)
      navigate({ to: href })

      setUrlState('transitionInReady')
    },
    [pathname, href, transitionOptions, setUrlState, navigate],
  )

  return (
    <a href={href} onClick={onClick} {...props}>
      {children}
    </a>
  )
}
