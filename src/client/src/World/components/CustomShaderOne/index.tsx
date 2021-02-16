import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader, useThree } from 'react-three-fiber';
import { TextureLoader } from 'three';
import './customShader';
import bruh from '../../../assets/thumb_gravel-033-256x256.jpg';
import { useEffect, useState } from 'react';

const CustomShaderOne = ({ vidFeed }: { vidFeed: any }) => {
  const tRef = useRef<any>();
  const [texture1] = useLoader(TextureLoader, [bruh]);
  const texture = new THREE.VideoTexture(vidFeed.current);
  const { size, viewport, aspect, forceResize, invalidate } = useThree();
  useFrame(() => {
    tRef.current.t += 0.5;
  });

  return (
    <mesh position={[0, 0, 0]} scale={[1, 1, 1]}>
      <boxBufferGeometry args={[viewport.width < 7 ? aspect * 4 : aspect * 3, viewport.width < 7 ? aspect * 4 : aspect * 3]} />
      {/**@ts-ignore*/}
      <imageFadeMaterial attach="material" t={0.5} map={texture} ref={tRef} textu={texture1}>
        <meshToonMaterial>
          <videoTexture attach="map" args={[vidFeed.current]} />
        </meshToonMaterial>
        {/**@ts-ignore*/}
      </imageFadeMaterial>
    </mesh>
  );
};

export default CustomShaderOne;
