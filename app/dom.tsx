"use client";

// import { useRef } from "react";
import dynamic from "next/dynamic";
import useDisablePinch from "@hooks/useDisablePinch";
import useSpecific from "@hooks/useSpecific";
import useTheme from "@hooks/useTheme";
import { usePathname } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Env } from "(3D)/Environment";

const Scene = dynamic(() => import("(3D)/Scene"), {
  ssr: false,
});
const Camera = dynamic(() => import("(3D)/Camera"), {
  ssr: false,
});
function Dom({ children }: { children: React.ReactNode }) {
  // const ref = useRef<HTMLDivElement>(null!);
  const pathname = usePathname();
  const admin = pathname.split("/")[1] === "admin";

  useTheme();
  useSpecific();
  useDisablePinch();

  return (
    <>
      {children}
      {!admin && (
        <>
          <Canvas
            linear
            dpr={[0.5, 2]}
            className="!fixed !top-0 -z-10 "
            gl={{ antialias: true, alpha: true }}
            eventSource={document?.documentElement}
            eventPrefix="client"
          >
            <Preload all />
            <Camera />
            <Scene />
            <Env />
          </Canvas>
        </>
      )}
    </>
  );
}

export default Dom;
