import { useThree } from 'react-three-fiber';
import { useAspect } from '@react-three/drei/';
import { Flex, Box } from '@react-three/flex';
import { Suspense } from 'react';
import BasicPlane from '../BasicPlane';
const Scene = ({ myVid, otherVid }: { myVid: any; otherVid: any }) => {
  const { viewport } = useThree();

  const [x, y] = useAspect('cover', viewport.width, viewport.height);

  return (
    <Flex justifyContent="space-between" alignItems="center" flexDirection="row">
      <Box centerAnchor>
        <Suspense fallback={null}>
          <BasicPlane vidFeed={myVid} x={1} y={y} />
        </Suspense>
      </Box>
      <Box centerAnchor>
        <Suspense fallback={null}>
          <BasicPlane vidFeed={otherVid} x={2} y={y} />
        </Suspense>
      </Box>
    </Flex>
  );
};

export default Scene;
