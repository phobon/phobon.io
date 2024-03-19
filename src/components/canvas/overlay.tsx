import { useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useLayoutStore } from '@/stores/use_layout_store'
// import { useControls } from 'leva'
import PixellationNoiseMaterial from '@/components/effects/pixellation_noise'

const Overlay = () => {
  const overlayRef = useRef<any>()
  const progressValue = useMotionValue(1)
  const progressSpring = useSpring(progressValue, { damping: 300, stiffness: 800 })

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) {
      return
    }

    const unsubscribe = useLayoutStore.subscribe(({ loaded }) => {
      progressValue.set(loaded ? 0 : 1)
      // animate(overlay.material.uniforms.u_progress.value, loaded ? 0 : 1, {
      //   // duration: 3,
      //   onUpdate: (latest) => {
      //     overlay.material.uniforms.u_progress.value = latest
      //   },
      // })
    })

    return () => {
      unsubscribe()
    }
  }, [progressValue])

  // useControls({
  //   progress: {
  //     value: 1,
  //     min: 0,
  //     max: 1,
  //     onChange: (value) => {
  //       if (!overlayRef.current) {
  //         return
  //       }
  //       overlayRef.current.material.uniforms.u_progress.value = value
  //     },
  //   },
  // })

  return (
    <mesh ref={overlayRef}>
      <planeGeometry args={[2, 2]} />
      <PixellationNoiseMaterial progress={progressSpring} initial={1} />
    </mesh>
  )
}

export default Overlay
