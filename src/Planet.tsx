import { useVideoConfig } from 'remotion'
import { useCurrentFrame } from 'remotion'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader } from '@react-three/fiber';


import planetTexture from './wax_red.jpg'
function Planet() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();


  const colorMap = useLoader(TextureLoader, planetTexture)
  // Place a camera and set the distance to the object.
  // Then make it look at the object.

  return (
    <mesh>
      <sphereGeometry args={[3, 32, 32]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  )
}

export default Planet