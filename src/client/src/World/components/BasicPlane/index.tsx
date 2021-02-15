const BasicPlane = ({ vidFeed, x, y }: { vidFeed: any; x: any; y: any }) => {
  return (
    <mesh position={[1, 1, 1]}>
      <planeBufferGeometry args={[1, 1]} />
      <meshToonMaterial>
        <videoTexture attach="map" args={[vidFeed.current]} />
      </meshToonMaterial>
    </mesh>
  );
};

export default BasicPlane;
