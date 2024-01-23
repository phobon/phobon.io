import { useEffect, useState } from 'react'

export const useCachedState = <T>(key: string, initialValue: T): Array<T | React.Dispatch<React.SetStateAction<T>>> => {
  const [state, setState] = useState<T>(() => initialValue)

  // Wrapping this in a useEffect so that SSR instances can handle it.
  useEffect(() => {
    const result: string | null = window.localStorage.getItem(key)
    if (result) {
      setState(JSON.parse(result))
    } else {
      setState(initialValue)
    }
  }, [])

  const setCachedState = (value: any) => {
    try {
      const newState = value instanceof Function ? value(state) : value
      setState(newState)

      window.localStorage.setItem(key, JSON.stringify(newState))
    } catch (e) {
      console.error(e)
    }
  }

  return [state, setCachedState]
}
