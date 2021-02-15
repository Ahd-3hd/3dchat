import { forceResize, useThree } from 'react-three-fiber';
import { Flex, Box } from '@react-three/flex';
import { Suspense, useState, useEffect } from 'react';
import BasicPlane from '../BasicPlane';
const Scene = ({ myVid, otherVid, effect }: { myVid: any; otherVid: any; effect: any }) => {
  const [dir, setDir] = useState<'column' | 'row'>('row');
  const { size, viewport, aspect } = useThree();
  console.log(viewport.width);

  return (
    <Flex flexDirection={viewport.width < 7 ? 'column' : 'row'} alignItems="center" justifyContent="center" size={[0, 0, 0]} position={[0, 0, 0]}>
      <Box margin={0.1} centerAnchor>
        <Suspense fallback={null}>
          <BasicPlane vidFeed={myVid} effect={effect} />
        </Suspense>
      </Box>
      <Box margin={0.1} centerAnchor>
        <Suspense fallback={null}>
          <BasicPlane vidFeed={otherVid} effect={effect} />
        </Suspense>
      </Box>
    </Flex>
  );
};

export default Scene;
