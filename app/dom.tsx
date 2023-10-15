"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
// import useDisablePinch from "@hooks/useDisablePinch";
import useSpecific from "@hooks/useSpecific";
import { Nav } from "(ui)";
const Comp = dynamic(() => import("(3D)/Canvas"), {
  ssr: false,
});
const Footer = dynamic(() => import("(ui)").then((mod) => mod.Footer));
const Media = dynamic(() => import("(ui)/Media"));

function Dom({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null!);

  useSpecific();
  // useDisablePinch();

  return (
    <div ref={ref} className="fixed top-0 h-screen w-screen">
      <Nav />
      {children}
      <Footer />
      <Media />
      <Comp
        linear
        dpr={[1, 2]}
        className="!fixed !top-0 -z-10 "
        gl={{ antialias: true, alpha: true }}
        eventSource={ref}
        eventPrefix="client"
      />
    </div>
  );
}

export default Dom;
