"use client";

import { Html, Stats, useAspect, useProgress } from "@react-three/drei";
// import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Box, Flex } from "@react-three/flex";
import { Suspense } from "react";

export default function Composition({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <>
      <Canvas
        linear
        dpr={[1, 2]}
        className="!fixed -z-10 "
        gl={{ antialias: false, alpha: true }}
      >
        <Scene>{children}</Scene>
      </Canvas>
      {/* <Stats className="!top-auto !bottom-0" /> */}
    </>
  );
}

function Scene({ children }: { children?: React.ReactNode }) {
  const { size } = useThree();
  const [vpWidth, vpHeight] = useAspect(size.width, size.height);
  const progress = useProgress();
  return (
    <Suspense fallback={<Html center>{progress.progress}%</Html>}>
      <Flex
        flexDirection="column"
        scaleFactor={1}
        justify="flex-start"
        align="flex-end"
        width={vpWidth}
        height={vpHeight}
        position={[-vpWidth / 2, vpHeight / 2, 0]}
      >
        <Box width={0.1} height={0.1} mt={2}>
          {children}
        </Box>
      </Flex>
      <orthographicCamera position={[0, 0, 100]} far={1000} near={0.1} />
      {/* <OrbitControls minDistance={30} maxDistance={200} /> */}
    </Suspense>
  );
}
