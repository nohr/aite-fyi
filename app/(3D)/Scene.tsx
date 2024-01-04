"use client";

import { Html, useProgress } from "@react-three/drei";
import { Suspense } from "react";
import { Scan } from "./Scan";
import { Device } from "./(Device)";
import { EkoDigital } from "./EkoDigital";
import { usePathname } from "next/navigation";
import { useUIStore } from "(ui)";
import { Env } from "./Environment";
import { useFrame } from "@react-three/fiber";

function Scene() {
  const { progress } = useProgress();
  const params = usePathname().split("/")[2];
  const project = useUIStore((s) => s.project);
  const show_devices = project?.medium === "website";

  useFrame((state) => {
    if (state.scene.children.length < 2 && state.frameloop === "always") {
      // wait 500ms before switching to demand
      setTimeout(() => {
        state.setFrameloop("demand");
      }, 500);
    } else if (
      state.scene.children.length > 1 &&
      state.frameloop === "demand"
    ) {
      state.setFrameloop("always");
    }
  });
  return (
    <Suspense fallback={<Html center>{progress.toFixed(0)}%</Html>}>
      <Scan />
      {show_devices ? <Device /> : null}
      {params === "eko-digital" ? <EkoDigital /> : null}
      {params && <Env />}
    </Suspense>
  );
}

export default Scene;
