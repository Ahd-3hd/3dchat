import { MeshWobbleMaterial, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { useThree } from 'react-three-fiber';

const WobblyBox = ({ vidFeed }: { vidFeed: any }) => {
  const { size, viewport, aspect } = useThree();

  return (
    <mesh>
      <boxBufferGeometry attach="geometry" args={[viewport.width < 7 ? aspect : aspect, viewport.width < 7 ? aspect : aspect, viewport.width < 7 ? aspect : aspect]} />
      <MeshWobbleMaterial attach="material" factor={1} speed={3} color="white">
        <videoTexture attach="map" args={[vidFeed.current]} />
      </MeshWobbleMaterial>
    </mesh>
  );
};

export default WobblyBox;
