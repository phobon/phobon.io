'use client'

import { animate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useLayoutStore } from '@/stores/use_layout_store'
// import { useControls } from 'leva'
import PixellationNoiseMaterial from '@/components/effects/pixellation_noise'

const Overlay = () => {
  const overlayRef = useRef<any>(null)
  const progressValue = useMotionValue(1.1)
  const headerValue = useTransform(progressValue, [0.3, 0], [0, 1])
  // const progressSpring = useSpring(progressValue, { damping: 300, stiffness: 800 })

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) {
      return
    }

    const header = document.querySelector('header')

    const unsubscribe = useLayoutStore.subscribe(({ loaded }) => {
      // console.log({ loaded })
      // progressValue.set(loaded ? 0 : 1)
      animate(progressValue, loaded ? 0 : 1, {
        duration: 1,
        onUpdate: (latest) => {
          const headerLatest = headerValue.get()
          header.style.setProperty('--progress', `${headerLatest}`)
          overlay.material.uniforms.u_progress.value = latest
        },
      })
    })

    return () => {
      unsubscribe()
    }
  }, [headerValue, progressValue])

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
      <PixellationNoiseMaterial progress={progressValue} initial={1} />
    </mesh>
  )
}

export default Overlay
