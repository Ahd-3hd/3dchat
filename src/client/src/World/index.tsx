import { Wrapper, EffectSelection } from './index.style';
import { Canvas } from 'react-three-fiber';
import Scene from './components/Scene';
import { useEffect, useState } from 'react';

const World = ({ myVid, otherVideo }: { myVid: any; otherVideo: any }) => {
  const [show, setShow] = useState(false);
  const [effect, setEffect] = useState('0');

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <Wrapper>
      {show && (
        <Canvas
          gl={{ powerPreference: 'high-performance', alpha: false, antialias: false, stencil: false, depth: false }}
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
          <Scene myVid={myVid} otherVid={otherVideo} effect={effect} />
        </Canvas>
      )}
      <EffectSelection onChange={(e) => setEffect(e.target.value)}>
        <option value={0}>Effect One</option>
        <option value={1}>Effect Two</option>
        <option value={2}>Effect Three</option>
        <option value={3}>Effect Four</option>
      </EffectSelection>
    </Wrapper>
  );
};

export default World;
