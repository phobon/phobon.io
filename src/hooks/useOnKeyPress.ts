import { useEffect, useCallback } from 'react'

const eventHandler = (
  e: KeyboardEvent,
  handler: (event: KeyboardEvent) => void,
  targetKey: string,
  targetModifier: string,
  debug: boolean,
) => {
  if (debug) {
    console.log('keydown', e.key, e.key !== targetKey)
  }

  // Check if a modifier has been pressed, this doesn't matter if modifier is null.
  if (targetModifier && !e.getModifierState(targetModifier)) {
    return
  }

  // The correct modifier (or nothing) has been pressed, so check the key.
  if (targetKey !== e.key) {
    return
  }

  if (handler) {
    handler(e)
  }
}

export const useOnKeyPress = (
  targetKey: string,
  onKeyDownHandler?: (e: KeyboardEvent) => void,
  onKeyUpHandler?: (e: KeyboardEvent) => void,
  targetModifier = '',
  debug = false,
) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) =>
      eventHandler(e, onKeyDownHandler ? onKeyDownHandler : () => {}, targetKey, targetModifier, debug),
    [],
  )
  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => eventHandler(e, onKeyUpHandler ? onKeyUpHandler : () => {}, targetKey, targetModifier, debug),
    [],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])
}
