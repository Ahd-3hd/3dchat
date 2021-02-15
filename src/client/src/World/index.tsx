import { Wrapper } from './index.style';
import { Canvas } from 'react-three-fiber';
import Scene from './components/Scene';
import { OrbitControls, Center, OrthographicCamera } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { Camera } from 'three';

const World = ({ myVid, otherVideo }: { myVid: any; otherVideo: any }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <Wrapper>
      {show && (
        <Canvas
          gl={{
            alpha: true,
            logarithmicDepthBuffer: true,
            precision: 'lowp',
            preserveDrawingBuffer: true,
            antialias: true
          }}
          colorManagement
          shadowMap
          style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            bottom: '0',
            right: '0',
            zIndex: 2
          }}
        >
          <ambientLight color="white" intensity={0.7} />
          <spotLight intensity={0.2} position={[70, 70, 70]} />
          <Scene myVid={myVid} otherVid={otherVideo} />
        </Canvas>
      )}
    </Wrapper>
  );
};

export default World;
