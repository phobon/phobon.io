import { useState } from 'react'
import { useCursor, MeshDistortMaterial } from '@react-three/drei'

export const Blob = ({ ...props }) => {
  const [hovered, hover] = useState(false)
  useCursor(hovered)

  return (
    <mesh onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} {...props}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial roughness={0} color={hovered ? 'hotpink' : '#1fb2f5'} />
    </mesh>
  )
}
