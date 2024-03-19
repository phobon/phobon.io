/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react'

import { BrowserOS, useDetectOS } from './use_detect_os'

// This event handler is OS agnostic
const eventHandler = (
  e: KeyboardEvent,
  handler: (event: KeyboardEvent) => void,
  targetKey: string,
  targetModifier?: string,
  preventDefault = true,
  stopPropagation = true,
) => {
  // Check if a modifier has been pressed, this doesn't matter if modifier is null.
  if (targetModifier && !e.getModifierState(targetModifier)) {
    return
  }

  // The correct modifier (or nothing) has been pressed, so check the key.
  if (targetKey !== e.key && targetKey !== e.code) {
    return
  }

  if (handler) {
    if (preventDefault) {
      e.preventDefault()
    }
    if (stopPropagation) {
      e.stopPropagation()
    }

    handler(e)
  }
}

export type BrowserKeys = [key: BrowserOS, value: string][]

export type UseOnKeyPressOptions = {
  targetModifiers?: BrowserKeys
  debug?: boolean
  preventDefault?: boolean
  stopPropagation?: boolean
}

export const useOnKeyPress = (
  targetKeys: BrowserKeys,
  keyHandlers: Array<(e: KeyboardEvent) => void>,
  options: UseOnKeyPressOptions = {},
) => {
  const { targetModifiers, preventDefault, stopPropagation } = options
  const [onKeyDownHandler, onKeyUpHandler] = keyHandlers
  const currentOS = useDetectOS()

  const targets = new Map(targetKeys)
  const modifiers = new Map(targetModifiers)

  const handleKeyDown = useMemo(() => {
    if (!onKeyDownHandler || currentOS === BrowserOS.Unknown) {
      return null
    }

    const k = targets.get(currentOS) || targets.get(BrowserOS.Any)
    if (!k) {
      throw Error(`targetKey: ${k} not found`)
    }

    const m = modifiers.get(currentOS) || modifiers.get(BrowserOS.Any)

    return (e: KeyboardEvent) => eventHandler(e, onKeyDownHandler, k, m, preventDefault, stopPropagation)
  }, [onKeyDownHandler, currentOS])

  const handleKeyUp = useMemo(() => {
    if (!onKeyUpHandler || currentOS === BrowserOS.Unknown) {
      return null
    }

    const k = targets.get(currentOS) || targets.get(BrowserOS.Any)
    if (!k) {
      throw Error(`targetKey: ${k} not found`)
    }

    const m = modifiers.get(currentOS) || modifiers.get(BrowserOS.Any)

    return (e: KeyboardEvent) => eventHandler(e, onKeyUpHandler, k, m, preventDefault, stopPropagation)
  }, [onKeyUpHandler, currentOS])

  useEffect(() => {
    handleKeyDown && document.addEventListener('keydown', handleKeyDown)
    handleKeyUp && document.addEventListener('keyup', handleKeyUp)

    return () => {
      handleKeyDown && document.removeEventListener('keydown', handleKeyDown)
      handleKeyUp && document.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])
}

export type KeypressHandlerProps = {
  targetKeys: BrowserKeys
  keyHandlers: Array<(e: KeyboardEvent) => void>
  options: UseOnKeyPressOptions
}

export const KeypressHandler = ({ targetKeys, keyHandlers, options }: KeypressHandlerProps) => {
  useOnKeyPress(targetKeys, keyHandlers, options)
  return null
}
