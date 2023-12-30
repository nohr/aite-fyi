"use client";

// import { useRef } from "react";
import dynamic from "next/dynamic";
import useDisablePinch from "@hooks/useDisablePinch";
import useSpecific from "@hooks/useSpecific";
import { Nav } from "(ui)";
import useTheme from "@hooks/useTheme";
import { usePathname } from "next/navigation";

const Comp = dynamic(() => import("(3D)/Canvas"), {
  ssr: false,
});
const Footer = dynamic(() => import("(ui)").then((mod) => mod.Footer));
const Media = dynamic(() => import("(ui)/Media"));

function Dom({ children }: { children: React.ReactNode }) {
  // const ref = useRef<HTMLDivElement>(null!);
  const pathname = usePathname();
  const admin = pathname.split("/")[1] === "admin";

  useTheme();
  useSpecific();
  useDisablePinch();

  return (
    <>
      {!admin && (
        <>
          <Media />
          <Footer />
          <div
            id="blur_missed_spots"
            className="fixed -left-4 -top-6 z-20  hidden h-12 w-full -skew-x-[2deg] -skew-y-[0.3deg] bg-transparent backdrop-blur-sm md:block"
          />
          <Nav />
        </>
      )}
      {children}
      {!admin && (
        <>
          <Comp
            linear
            dpr={[0.5, 2]}
            className="!fixed !top-0 -z-10 "
            gl={{ antialias: true, alpha: true }}
            eventPrefix="client"
          />
        </>
      )}
    </>
  );
}

export default Dom;
