"use client";

import dynamic from "next/dynamic";
import useDisablePinch from "@hooks/useDisablePinch";
import useTheme from "@hooks/useTheme";
import { usePathname } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor, Preload } from "@react-three/drei";
import round from "lodash/round";
import { useState } from "react";

const Scene = dynamic(() => import("(3D)/Scene"), {
  ssr: false,
});
const Camera = dynamic(() => import("(3D)/Camera"), {
  ssr: false,
});

function Dom() {
  const pathname = usePathname();
  const admin = pathname.split("/")[1] === "admin";

  const [dpr, setDpr] = useState(2);
  useTheme();
  useDisablePinch();

  return (
    <>
      {!admin && (
        <>
          <Canvas
            dpr={dpr}
            linear
            className="pointer-events-none !fixed !top-0"
            eventSource={document?.querySelector("main") as HTMLElement}
            eventPrefix="client"
          >
            <PerformanceMonitor
              factor={1}
              onChange={({ factor }) => setDpr(round(0.5 + 1.5 * factor, 1))}
            />
            <Camera />
            <Scene />
            <Preload all />
            <AdaptiveDpr pixelated />
          </Canvas>
        </>
      )}
    </>
  );
}

export default Dom;
