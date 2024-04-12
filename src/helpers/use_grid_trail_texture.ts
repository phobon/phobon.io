import { ThreeEvent, useFrame } from '@react-three/fiber'
import { useCallback, useEffect, useRef, useState } from 'react'
import { clamp } from './math'
import * as THREE from 'three'

export type UseGridTrailTextureProps = {
  grid?: number
  radius?: number
  strength?: number
  decay?: number
}

export const useGridTrailTexture = (options?: UseGridTrailTextureProps): any => {
  const { grid = 50, radius = 0.05, strength = 0.06, decay = 0.75 } = options || {}
  const [dataTexture, setDataTexture] = useState<THREE.DataTexture>()

  const previousPointerRef = useRef({ x: 0, y: 0 })
  const pointerDeltaRef = useRef({ x: 0, y: 0 })
  const pointerRef = useRef({ x: 0, y: 0 })
  const viewportRef = useRef({ width: 0, height: 0 })

  const size = grid
  const width = size
  const height = size
  const dimensions = width * height

  useEffect(() => {
    // Regenerate grid on mount and on window resize
    const regenerateGrid = () => {
      viewportRef.current.width = window.innerWidth
      viewportRef.current.height = window.innerHeight

      // Populate data texture with initial values
      const data = new Float32Array(4 * dimensions)
      for (let stride = 0; stride < dimensions; stride++) {
        const index = stride * 4
        data[index] = 0
        data[index + 1] = 0
        data[index + 2] = 0
        data[index + 3] = 0
      }
      const dataTexture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat, THREE.FloatType)
      dataTexture.minFilter = dataTexture.magFilter = THREE.NearestFilter
      dataTexture.needsUpdate = true
      setDataTexture(dataTexture)
    }

    window.addEventListener('resize', regenerateGrid)
    regenerateGrid()

    return () => {
      window.removeEventListener('resize', regenerateGrid)
    }
  }, [dimensions, height, width])

  const onMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    const { x, y } = e
    pointerRef.current.x = x
    pointerRef.current.y = y

    // Pointer velocity
    pointerDeltaRef.current.x = pointerRef.current.x - previousPointerRef.current.x
    pointerDeltaRef.current.y = pointerRef.current.y - previousPointerRef.current.y

    // Cache previous pointer position
    previousPointerRef.current.x = pointerRef.current.x
    previousPointerRef.current.y = pointerRef.current.y
  }, [])

  useFrame(({}) => {
    if (!dataTexture) {
      return
    }

    const data = dataTexture.image.data

    const cellX = (size * pointerRef.current.x) / viewportRef.current.width
    const cellY = size * (1 - pointerRef.current.y / viewportRef.current.height)
    const mouseRadius = size * radius
    const aspect = viewportRef.current.height / viewportRef.current.width

    for (let stride = 0; stride < data.length; stride += 4) {
      data[stride] *= decay
      data[stride + 1] *= decay

      for (let x = 0; x < size; x++)
        for (let y = 0; y < size; y++) {
          // Calculate squared euclidian distance between two points
          const dist = (cellX - x) ** 2 / aspect + (cellY - y) ** 2
          const distMax = mouseRadius ** 2

          // If we're within the radius here, it's a hit think of this like a 2D raymarching calculation
          if (dist < distMax) {
            // Determine the strength and size of the force
            const dataIndex = 4 * (x + size * y)
            let force = mouseRadius / Math.sqrt(dist)
            force = clamp(force, 0, 10)

            data[dataIndex] += strength * Math.abs(pointerDeltaRef.current.x) * force
            data[dataIndex + 1] += strength * Math.abs(pointerDeltaRef.current.y) * force
          }
        }

      dataTexture.needsUpdate = true
    }

    // Decay pointer velocity
    if (pointerDeltaRef.current.x > 0) {
      pointerDeltaRef.current.x *= decay
    }
    if (pointerDeltaRef.current.y > 0) {
      pointerDeltaRef.current.y *= decay
    }
  })

  return [dataTexture, onMove]
}
