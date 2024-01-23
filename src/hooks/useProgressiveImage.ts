import { useEffect, useReducer } from 'react'

const actions = {
  MAIN_IMAGE_LOADED: 'MAIN_IMAGE_LOADED',
  FALLBACK_IMAGE_LOADED: 'FALLBACK_IMAGE_LOADED',
}

const reducer = (currentSrc, { type, src }) => {
  if (type === actions.MAIN_IMAGE_LOADED) {
    return
  }

  if (!currentSrc) {
    return src
  }

  return currentSrc
}

export const useProgressiveImage = ({ src, fallbackSrc }) => {
  const [currentSrc, dispatch] = useReducer(reducer, null)
  useEffect(() => {
    const mainImage = new Image()
    const fallbackImage = new Image()

    mainImage.onload = () => {
      dispatch({ type: actions.MAIN_IMAGE_LOADED, src })
    }
    fallbackImage.onload = () => {
      dispatch({ type: actions.FALLBACK_IMAGE_LOADED, src: fallbackSrc })
    }

    mainImage.src = src
    fallbackImage.src = fallbackSrc
  }, [src, fallbackSrc])

  return currentSrc
}
