"use client";

import { Html, Preload, StatsGl, useProgress } from "@react-three/drei";
import { Canvas, CanvasProps } from "@react-three/fiber";
import { Suspense } from "react";
import { Scan } from "./Scan";
import { Env } from "./Environment";
import Camera from "./Camera";
import { usePathname } from "next/navigation";
import { r3f } from "@helpers/global";
import { Device } from "./Device";

function Scene() {
  const { progress } = useProgress();

  return (
    <Suspense fallback={<Html center>{progress}%</Html>}>
      <Device />
      <Scan />
      {/* <OrbitControls minDistance={30} maxDistance={200} /> */}
    </Suspense>
  );
}

const Comp = (props: Partial<CanvasProps>) => {
  const pathname = usePathname().split("/");
  const page = pathname[1];

  return (
    <>
      {page !== "admin" ? (
        <Canvas {...props}>
          <r3f.Out />
          <Preload all />
          <Camera />
          <Scene />
          <Env />
          {process.env.NODE_ENV === "development" ? (
            <StatsGl
              className="!absolute !bottom-0 !left-auto !right-0 !top-auto
    h-[66px] w-[281px]"
            />
          ) : null}
        </Canvas>
      ) : null}
    </>
  );
};

export default Comp;
