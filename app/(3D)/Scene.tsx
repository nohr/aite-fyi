"use client";

import { Html, StatsGl, useProgress } from "@react-three/drei";
import { Suspense } from "react";
import { Scan } from "./Scan";
import { Device } from "./(Device)";
import { EkoDigital } from "./EkoDigital";
import { usePathname } from "next/navigation";
import { useUIStore } from "(ui)";

function Scene() {
  const { progress } = useProgress();
  const params = usePathname().split("/")[2];
  const project = useUIStore((s) => s.project);
  const show_devices = project?.medium === "website";

  return (
    <Suspense fallback={<Html center>{progress}%</Html>}>
      <Scan />
      {show_devices ? <Device /> : null}
      {params === "eko-digital" ? <EkoDigital /> : null}
      {process.env.NODE_ENV === "development" ? (
        <StatsGl
          className="!absolute !bottom-0 !left-auto !right-0 !top-auto
    h-[66px] w-[281px]"
        />
      ) : null}
    </Suspense>
  );
}

export default Scene;
