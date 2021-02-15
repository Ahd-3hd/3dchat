import { useAspect } from '@react-three/drei';
import { useFlexSize } from '@react-three/flex';
import { useThree } from 'react-three-fiber';

const BasicPlane = ({ vidFeed }: { vidFeed: any }) => {
  const { size, viewport, aspect } = useThree();
  return (
    <mesh>
      <planeBufferGeometry args={[viewport.width < 7 ? aspect * 4 : aspect * 3, viewport.width < 7 ? aspect * 4 : aspect * 3]} />
      <meshBasicMaterial>
        <videoTexture attach="map" args={[vidFeed.current]} />
      </meshBasicMaterial>
    </mesh>
  );
};

export default BasicPlane;
