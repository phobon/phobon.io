import { useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { forwardRef, useMemo } from 'react'

const FRUSTUM = 600

export const ScreenSizeCamera = forwardRef<any, any>(({ ...props }, ref) => {
  const { size } = useThree()
  const fov = useMemo(() => 2 * Math.atan(size.height / 2 / FRUSTUM) * (180 / Math.PI), [size])
  return <PerspectiveCamera position={[0, 0, FRUSTUM]} ref={ref} near={1} far={2000} fov={fov} {...props} />
})

ScreenSizeCamera.displayName = 'ScreenSizeCamera'
