"use client";

import React, { Suspense } from "react";
import {
  ScrollControls,
  ScrollControlsProps,
  SoftShadows,
  Stats,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Camera } from "./Camera";
// import { Env } from "./Environment";
// import { Modals } from "./Modals";

export function Landscape({
  children,
  ...props
}: React.PropsWithChildren<ScrollControlsProps>) {
  return (
    <>
      <Canvas
        // shadows
        dpr={[1, 1.5]}
        // gl={{ antialias: true }}
        frameloop="demand"
        className="!fixed !top-[64px] !left-0 -z-10 !m-0 !h-screen"
      >
        <ambientLight intensity={0.6} />
        <Camera zoom={28} position={[0, 0, 12]} far={80} near={0.1} />
        <ScrollControls {...props}>
          {children}
          {/* <Modals /> */}
        </ScrollControls>
        {/* <Env /> */}
        <SoftShadows />
        {/* <OrbitControls enableZoom={false} /> */}
      </Canvas>
      {/* <Stats className="!top-auto !bottom-0" /> */}
    </>
  );
}
