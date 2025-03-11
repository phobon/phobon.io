import { useSearchParams } from 'next/navigation'

export const useDebug = () => {
  const searchParams = useSearchParams()
  const debug = searchParams.get('debug')

  return debug
}
