import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing';

export const EffectOne = () => {
  return (
    <EffectComposer>
      <Noise opacity={-1} />
      <Noise opacity={-50} />
    </EffectComposer>
  );
};

export const EffectTwo = () => {
  return (
    <EffectComposer>
      <Noise opacity={-1} />
    </EffectComposer>
  );
};
