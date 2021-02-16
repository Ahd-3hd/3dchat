import { OrbitControls } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
const Particles = ({ vidFeed }: { vidFeed: any }) => {
  const mesh = useRef<any>();
  const instances = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 500; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.02 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, []);

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 10;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      particle.mx += particle.mx * 0.01;
      particle.my += particle.my * 0.01;
      instances.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );

      instances.scale.set(s, s, s);
      instances.rotation.set(s * 5, s * 5, s * 5);

      instances.updateMatrix();
      mesh.current.setMatrixAt(i, instances.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <>
      <OrbitControls />
      {/**@ts-ignore */}
      <instancedMesh ref={mesh} args={[null, null, 500]} scale={[1, 1, 1]}>
        <dodecahedronBufferGeometry args={[1, 0]} />
        <meshBasicMaterial>
          <videoTexture attach="map" args={[vidFeed.current]} />
        </meshBasicMaterial>
      </instancedMesh>
    </>
  );
};

export default Particles;
