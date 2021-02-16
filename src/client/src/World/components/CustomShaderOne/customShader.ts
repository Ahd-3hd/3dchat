import { extend } from 'react-three-fiber';
import { shaderMaterial } from '@react-three/drei';

const ImageFadeMaterial = shaderMaterial(
  {
    t: 0.1,
    //@ts-ignore
    map: undefined,
    //@ts-ignore
    textu: undefined
  },
  `varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,
  `
      #define SPEED 1.0
      #define OFFSET (texel.g * 10.0)
      uniform sampler2D map;
      uniform sampler2D textu;
      uniform float t;
      varying vec2 vUv;
      void main() {
          vec4 displace = texture2D(textu,vUv.yx);
          vec2 displacedUV =  vec2(vUv.x + 0.02 * sin(vUv.y*1.0 + t / 34.0),vUv.y);
          displacedUV.y = mix(vUv.y,displace.r - 0.1, vUv.x * 0.1 * sin(vUv.x * 1.0 + t / 19.0) * 1.0);
          vec4 texel = texture2D(map, displacedUV);
          vec4 texel2 = texture2D(textu, vUv);
          vec4 color = texture2D(map,displacedUV);

          color.r = texture2D(map,displacedUV + vec2(0.,0.5) * 0.03).r;
          color.g = texture2D(map,displacedUV + vec2(0.,0.1) * 0.03).g;
          color.b = texture2D(map,displacedUV + vec2(0.,0.3) * 0.03).b;
          gl_FragColor = color;
      }
      `
);
extend({ ImageFadeMaterial });
