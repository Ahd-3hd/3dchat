import { EffectComposer, DepthOfField, Bloom, Noise, Vignette, Glitch, Outline, DotScreen, Pixelation, ColorAverage } from '@react-three/postprocessing';
import { GlitchMode, BlendFunction, Resizer, KernelSize } from 'postprocessing';
import { useFrame } from 'react-three-fiber';
import { useState, useEffect, useRef } from 'react';

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
      <Vignette eskil={true} offset={1} darkness={3} />
      {/* <DotScreen
        blendFunction={BlendFunction.NORMAL} // blend mode
        angle={Math.PI * 0.5} // angle of the dot pattern
        scale={1.0} // scale of the dot pattern
      /> */}
      <Glitch
        //@ts-ignore
        delay={[1.5, 1.5]} // min and max glitch delay
        //@ts-ignore
        duration={[0.6, 1.0]} // min and max glitch duration
        //@ts-ignore
        strength={[0.3, 0]} // min and max glitch strength
        mode={GlitchMode.SPORADIC} // glitch mode
        active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
        ratio={0.25} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
      />
    </EffectComposer>
  );
};

export const EffectThree = () => {
  return (
    <EffectComposer>
      <DotScreen
        blendFunction={BlendFunction.NORMAL} // blend mode
        angle={Math.PI * 0.5} // angle of the dot pattern
        scale={1} // scale of the dot pattern
      />
    </EffectComposer>
  );
};

export const EffectFour = () => {
  return (
    <EffectComposer>
      <Pixelation
        granularity={5} // pixel granularity
      />
    </EffectComposer>
  );
};
