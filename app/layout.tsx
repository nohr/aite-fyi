"use client";

import "./globals.css";
import React, { useEffect, useState } from "react";
// import Cursor from "(cursor)";
import Nav, { Fade, SplashScreen } from "(ui)";
import { Device, Landscape, Scan, VideoMaterial } from "(3D)";
import { About, Home, Project } from "(routes)";
import { Scroll } from "@react-three/drei";
import data from "@public/data.json" assert { type: "json" };
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobile, setMobile] = useState<boolean>(false);
  const [mobileOnly, setMobileOnly] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setMobile(window.matchMedia("(max-width: 768px)").matches);
    setMobileOnly(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  const [home, setHome] = useState(false);
  const [loading, setLoading] = useState(true);
  return (
    <html lang="en" className=" bg-zinc-200 dark:bg-zinc-900">
      <head />
      <body
        className="hidebar relative flex w-full  flex-col text-zinc-900 selection:bg-zinc-900 selection:text-zinc-200 dark:text-zinc-400 selection:dark:bg-zinc-400 selection:dark:text-zinc-900
"
      >
        <SplashScreen loading={loading} />
        {/* <Cursor /> */}
        {children}
        <Nav mobile={mobile} setMobile={setMobile} home={home} />
        <Fade truthy={pathname === "/about"} init={0}>
          <About />
        </Fade>
        <Landscape
          pages={1 + data.projects.length}
          damping={0.1}
          horizontal={!mobileOnly}
        >
          <Scroll html>
            <div className=" relative !top-[64px] left-0 flex !h-full !w-full !translate-x-0 !translate-y-0 flex-col overflow-scroll md:flex-row">
              <Home />
              {data.projects.map((project, i) => (
                <Project key={i} {...project} />
              ))}
            </div>
          </Scroll>
          <Scroll>
            <Scan
              position={mobileOnly ? [4, 0, 0] : [7, -2, 0]}
              scale={mobileOnly ? 0.3 : 0.5}
            />
          </Scroll>
          <Device
            mobile={mobile}
            projects={data.projects}
            home={home}
            setHome={setHome}
          >
            <VideoMaterial
              mobile={mobile}
              projects={data.projects}
              setLoading={setLoading}
            />
          </Device>
        </Landscape>
      </body>
    </html>
  );
}
