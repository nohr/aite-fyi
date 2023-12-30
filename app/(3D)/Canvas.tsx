"use client";

import { Html, Preload, StatsGl, useProgress } from "@react-three/drei";
import { Canvas, CanvasProps } from "@react-three/fiber";
import { Suspense } from "react";
import { Scan } from "./Scan";
import { Env } from "./Environment";
import Camera from "./Camera";
import { Device } from "./(Device)";
import { EkoDigital } from "./EkoDigital";
import { usePathname } from "next/navigation";
import { useUIStore } from "(ui)";

function Scene() {
  const { progress } = useProgress();
  const params = usePathname().split("/")[2];
  const project = useUIStore((s) => s.project);
  const hide_devices = project?.medium !== "website";

  return (
    <Suspense fallback={<Html center>{progress}%</Html>}>
      {hide_devices ? null : <Device />}
      <Scan />
      {params === "eko-digital" ? <EkoDigital /> : null}
    </Suspense>
  );
}

const Comp = (props: Partial<CanvasProps>) => {
  return (
    <Canvas {...props} eventSource={document.body}>
      <Preload all />
      <Camera />
      <Scene />
      <Env />
      {/* {process.env.NODE_ENV === "development" ? (
            <StatsGl
              className="!absolute !bottom-0 !left-auto !right-0 !top-auto
    h-[66px] w-[281px]"
            />
          ) : null} */}
    </Canvas>
  );
};

export default Comp;
