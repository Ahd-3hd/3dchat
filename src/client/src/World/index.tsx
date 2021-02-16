import { Wrapper, EffectSelection, SelectionContainer } from './index.style';
import { Canvas } from 'react-three-fiber';
import Scene from './components/Scene';
import { useEffect, useState } from 'react';

const World = ({ myVid, otherVideo }: { myVid: any; otherVideo: any }) => {
  const [show, setShow] = useState(false);
  const [effect, setEffect] = useState('0');
  const [envIndex, setEnvIndex] = useState('0');

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <Wrapper>
      {show && (
        <Canvas
          gl={{ powerPreference: 'high-performance', alpha: true, antialias: false, stencil: false, depth: false }}
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
          <Scene myVid={myVid} otherVid={otherVideo} effect={effect} envIndex={envIndex} />
        </Canvas>
      )}
      <SelectionContainer>
        <EffectSelection onChange={(e) => setEffect(e.target.value)}>
          <option value={0}>Effect One</option>
          <option value={1}>Effect Two</option>
          <option value={2}>Effect Three</option>
          <option value={3}>Effect Four</option>
        </EffectSelection>
        <EffectSelection onChange={(e) => setEnvIndex(e.target.value)}>
          <option value={0}>Env One</option>
          <option value={1}>Env Two</option>
          <option value={2}>Env Three</option>
          <option value={3}>Env Four</option>
        </EffectSelection>
      </SelectionContainer>
    </Wrapper>
  );
};

export default World;
