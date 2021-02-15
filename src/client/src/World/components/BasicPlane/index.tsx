import { useAspect } from '@react-three/drei';
import { useFlexSize } from '@react-three/flex';
import { useThree } from 'react-three-fiber';
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { useEffect, useRef } from 'react';
import { EffectOne, EffectTwo, EffectThree, EffectFour, EffectFive } from './Effects';
import React from 'react';

const BasicPlane = ({ vidFeed, effect }: { vidFeed: any; effect: any }) => {
  const { size, viewport, aspect } = useThree();

  const renderEffects = () => {
    const effects = [EffectOne, EffectTwo, EffectThree, EffectFour, EffectFive];
    return React.createElement(effects[parseInt(effect)]);
  };

  return (
    <mesh>
      <planeBufferGeometry args={[viewport.width < 7 ? aspect * 4 : aspect * 3, viewport.width < 7 ? aspect * 4 : aspect * 3]} />
      <meshBasicMaterial>
        <videoTexture attach="map" args={[vidFeed.current]} />
      </meshBasicMaterial>
      {renderEffects()}
    </mesh>
  );
};

export default BasicPlane;
