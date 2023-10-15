"use client";

import { Html, Preload, useProgress } from "@react-three/drei";
import { Canvas, CanvasProps, useThree } from "@react-three/fiber";
import { Suspense, } from "react";
import { Device } from "./Device";
import { Scan } from "./Scan";
import { Env } from "./Environment";
import Camera from "./Camera";
import { usePathname } from "next/navigation";
import { r3f } from "@helpers/global";

function Scene({ params }: { params: string[] }) {
  const { size } = useThree();
  const { progress } = useProgress();

  return (
    <Suspense fallback={<Html center>{progress}%</Html>}>
      {params.length > 0 ? <Device params={params} size={size} /> : <Scan />}
      {/* <OrbitControls minDistance={30} maxDistance={200} /> */}
    </Suspense>
  );
}

const Comp = (props: Partial<CanvasProps>) => {
  const pathname = usePathname().split("/");
  const page = pathname[1];
  const params = pathname.slice(2);

  return (
    <>
      {page !== "admin" ? (
        <Canvas {...props}>
          <r3f.Out />
          <Preload all />
          <Camera />
          <Scene params={params} />
          <Env />
          {/* {process.env.NODE_ENV === "development" ? <StatsGl /> : null} */}
        </Canvas>
      ) : null}
    </>
  );
};

export default Comp;
