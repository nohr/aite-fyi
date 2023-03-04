"use client";

import "./globals.css";
import React, { useEffect, useState } from "react";
// import Cursor from "(cursor)";
import { Nav } from "(ui)";
import { Landscape } from "(3D)/Landscape";
import { Home, Project } from "(routes)";
import { Scroll } from "@react-three/drei";
import { Scan } from "(3D)/Scan";
import { Device } from "(3D)/Device";
import data from "@public/data.json" assert { type: "json" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobile, setMobile] = useState<boolean | undefined>();
  const [mobileOnly, setMobileOnly] = useState(true);

  useEffect(() => {
    setMobile(window.matchMedia("(max-width: 768px)").matches);
    setMobileOnly(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  const [home, setHome] = useState(false);

  return (
    <html lang="en" className=" bg-zinc-200 dark:bg-zinc-900">
      <head />
      <body
        className="hidebar relative flex w-full  flex-col text-zinc-900 selection:bg-zinc-900 selection:text-zinc-200 dark:text-zinc-500 selection:dark:bg-zinc-500 selection:dark:text-zinc-900
"
      >
        {/* <SplashScreen /> */}
        {/* <Cursor /> */}
        {children}
        <Nav
          mobile={mobile}
          setMobile={setMobile}
          projects={data.projects}
          home={home}
        />
        <Landscape
          pages={1 + data.projects.length}
          // infinite
          damping={0.2}
          horizontal={!mobileOnly}
        >
          <Scroll html>
            <div className=" !h-full!w-full relative top-0 left-0 flex !translate-x-0 !translate-y-0 flex-col overflow-scroll md:flex-row">
              <Home />
              {data.projects.map((project, i) => (
                <Project key={i} {...project} />
              ))}
            </div>
          </Scroll>
          <Scroll>
            <Scan
              position={mobileOnly ? [4, 2, 0] : [7, -2, 0]}
              scale={mobileOnly ? 0.3 : 0.5}
            />
          </Scroll>
          <Device
            mobile={mobile}
            projects={data.projects}
            home={home}
            setHome={setHome}
          />
        </Landscape>
      </body>
    </html>
  );
}
