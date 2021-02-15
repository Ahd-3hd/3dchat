import { forceResize, useThree } from 'react-three-fiber';
import { Flex, Box } from '@react-three/flex';
import { Suspense, useState, useEffect } from 'react';
import BasicPlane from '../BasicPlane';
const Scene = ({ myVid, otherVid, effect, envIndex }: { myVid: any; otherVid: any; effect: any; envIndex: any }) => {
  const [dir, setDir] = useState<'column' | 'row'>('row');
  const { size, viewport, aspect } = useThree();

  const env = [BasicPlane];

  const renderer = (feed: any) => {
    return <BasicPlane vidFeed={feed} effect={effect} />;
    // switch (parseInt(envIndex)) {
    //   case 0:
    //     return <BasicPlane vidFeed={feed} effect={effect} />;
    //   default:
    //     return null;
    // }
  };

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
