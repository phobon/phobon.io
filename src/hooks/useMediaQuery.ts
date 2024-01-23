import { useState, useEffect } from 'react'

export const useMediaQuery = (query: string, onMediaQueryChanged: (mql?: MediaQueryList) => void) => {
  const [mediaQuery, setMediaQuery] = useState<MediaQueryList>(() => null)

  useEffect(() => {
    const mql = window.matchMedia(query)
    if (mql.matches) {
      onMediaQueryChanged(mql)
    }

    const mqlChanged = () => onMediaQueryChanged(mql)

    mql.addEventListener('change', mqlChanged)

    setMediaQuery(mediaQuery)

    return () => mql.removeEventListener('change', mqlChanged)
  }, [mediaQuery, onMediaQueryChanged, query])
}
