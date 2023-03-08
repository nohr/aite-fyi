"use client";

import React, { Suspense, useEffect } from "react";
import {
  Html,
  OrbitControls,
  PerformanceMonitor,
  ScrollControls,
  ScrollControlsProps,
  Stats,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Camera } from "./Camera";
import { Env } from "./Environment";
// import { Modals } from "./Modals";
import round from "lodash/round";
import { useUIStore } from "(ui)";

export function Landscape({
  children,
  ...props
}: React.PropsWithChildren<ScrollControlsProps>) {
  const [dpr, setDpr] = React.useState(1.5);
  // useEffect(() => {
  //   console.log("dpr", dpr);
  // }, [dpr]);

  return (
    <>
      <Canvas
        id="fullscreen"
        dpr={dpr}
        // gl={{ antialias: true }}
        // frameloop="demand"
      >
        <Suspense fallback={null}>
          <PerformanceMonitor
            factor={1}
            onChange={({ factor }) => setDpr(round(0.5 + 1.5 * factor, 1))}
          />
          {/* <ambientLight intensity={0.6} /> */}
          <Camera zoom={28} position={[0, 0, 12]} far={80} near={0.1} />
          <ScrollControls {...props}>{children}</ScrollControls>
          <Env />
          {/* <OrbitControls enableZoom={false} /> */}
        </Suspense>
      </Canvas>
      {/* <Stats className="!top-auto !bottom-0" /> */}
    </>
  );
}
