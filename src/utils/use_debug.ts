import { useRouterState } from '@tanstack/react-router'

export const useDebug = () => {
  const searchStr = useRouterState({ select: (s) => s.location.searchStr })
  const searchParams = new URLSearchParams(searchStr ?? '')
  return searchParams.get('debug')
}
