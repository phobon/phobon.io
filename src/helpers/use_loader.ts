import { useLayoutStore } from '@/stores/use_layout_store'
import { useEffect } from 'react'

export const useLoader = ({ onProgress, onLoad }) => {
  useEffect(() => {
    // Subscrive to the layout store
    let currentLoaded = useLayoutStore.getState().loaded
    const unsubscribe = useLayoutStore.subscribe(({ progress, loaded }) => {
      if (onProgress) {
        onProgress(progress)
      }

      if (currentLoaded !== loaded && loaded && onLoad) {
        onLoad(loaded)
        currentLoaded = loaded
      }
    })

    return () => {
      unsubscribe()
    }
  })
}
