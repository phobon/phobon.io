'use client'

import { usePathname, useRouter } from 'next/navigation'
import { LayoutStore, useLayoutStore } from '@/stores/use_layout_store'
import { wait } from './wait'

const urlStateSelector = ({
  setUrlState,
  transitionOptions,
}): Pick<LayoutStore, 'setUrlState' | 'transitionOptions'> => ({ setUrlState, transitionOptions })

export const Link = ({ href, children, ...props }) => {
  const { setUrlState, transitionOptions } = useLayoutStore(urlStateSelector)
  const router = useRouter()
  const pathname = usePathname()

  // Trigger a transition
  const onClick = async (e) => {
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
    router.push(href)

    setUrlState('transitionInReady')
  }

  return (
    <a href={href} onClick={onClick} {...props}>
      {children}
    </a>
  )
}
