"use client";

import { Html, useProgress } from "@react-three/drei";
import { Suspense } from "react";
import { Scan } from "./Scan";
import { Device } from "./(Device)";
import { EkoDigital } from "./EkoDigital";
import { usePathname } from "next/navigation";
import { useUIStore } from "(ui)";
import { Env } from "./Environment";

function Scene() {
  const { progress } = useProgress();
  const params = usePathname().split("/")[2];
  const project = useUIStore((s) => s.project);
  const show_devices = project?.medium === "website";

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
