import { forceResize, useThree } from 'react-three-fiber';
import { Flex, Box } from '@react-three/flex';
import { Suspense, useState, useEffect, useCallback } from 'react';
import BasicPlane from '../BasicPlane';
import CustomShaderOne from '../CustomShaderOne';
const Scene = ({ myVid, otherVid, effect, envIndex }: { myVid: any; otherVid: any; effect: any; envIndex: any }) => {
  const [dir, setDir] = useState<'column' | 'row'>('row');
  const { size, viewport, aspect } = useThree();

  const env = [BasicPlane, CustomShaderOne];
  const [state, setState] = useState(true);
  const renderer = useCallback(
    (feed: any) => {
      return <CustomShaderOne vidFeed={feed} />;
      // switch (parseInt(envIndex)) {
      //   case 0:
      //     return <BasicPlane vidFeed={feed} effect={effect} />;
      //   case 1:
      //     return <CustomShaderOne vidFeed={feed} />;
      //   default:
      //     return null;
      // }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [envIndex]
  );
  useEffect(() => {
    setTimeout(() => setState((s) => !s), 1000);
  }, [renderer]);

  return (
    <Flex flexDirection={viewport.width < 7 ? 'column' : 'row'} alignItems="center" justifyContent="center" size={[0, 0, 0]} position={[0, 0, 0]}>
      <Box margin={0.1} centerAnchor>
        <Suspense fallback={null}>{renderer(myVid)}</Suspense>
      </Box>
      <Box margin={0.1} centerAnchor>
        <Suspense fallback={null}>{renderer(otherVid)}</Suspense>
      </Box>
    </Flex>
  );
};

export default Scene;
