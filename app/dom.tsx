"use client";

// import { useRef } from "react";
import dynamic from "next/dynamic";
import useDisablePinch from "@hooks/useDisablePinch";
// import useSpecific from "@hooks/useSpecific";
import useTheme from "@hooks/useTheme";
import { usePathname } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { Preload, StatsGl } from "@react-three/drei";

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
  // useSpecific();
  useDisablePinch();

  return (
    <>
      {children}
      {!admin && (
        <>
          <Canvas
            linear
            dpr={[0.5, 2]}
            className="pointer-events-none !fixed !top-0"
            gl={{ antialias: false, alpha: true }}
            eventSource={document?.body}
            eventPrefix="client"
          >
            <Preload all />
            <Camera />
            <Scene />
            {process.env.NODE_ENV === "development" ? (
              <StatsGl
                className="!absolute !bottom-0 !left-auto !right-0 !top-auto !hidden h-[66px]
    w-[281px] md:!block"
              />
            ) : null}
          </Canvas>
        </>
      )}
    </>
  );
}

export default Dom;
