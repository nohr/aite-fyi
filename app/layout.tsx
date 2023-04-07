"use client";

import "./globals.css";
import React, { useEffect, useState } from "react";
// import Cursor from "(cursor)";
import Nav, { Fade, SplashScreen, useUIStore } from "(ui)";
import { Device, Landscape, Scan, VideoMaterial } from "(3D)";
import { About, Home, Project } from "(routes)";
import { PresentationControls, Scroll } from "@react-three/drei";
import { usePathname } from "next/navigation";
import { ProjectType } from "api/projects/route";

async function getProjects() {
  const res = await fetch("/api/projects", {
    method: "GET",
  });
  const data = await res.json();
  return data;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useUIStore((state) => state.theme);
  const setTheme = useUIStore((state) => state.setTheme);
  const [mobile, setMobile] = useState<boolean>(false);
  const [mobileOnly, setMobileOnly] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setMobile(window.matchMedia("(max-width: 768px)").matches);
    setMobileOnly(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  useEffect(() => {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    setTheme(theme);
    // listen for changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        setTheme(e.matches ? "dark" : "light");
      });
  }, [setTheme]);

  // data fetching
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    getProjects().then((projects) => {
      setProjects(projects);
    });
  }, []);

  const [home, setHome] = useState(false);
  const [loading, setLoading] = useState(true);
  return (
    <html lang="en" className=" ">
      <head />
      <body
        className="hidebar relative flex flex-col selection:bg-zinc-900 selection:text-zinc-200
        selection:dark:bg-lime-200 selection:dark:text-zinc-900
"
      >
        <SplashScreen loading={loading} />
        {/* <Cursor /> */}
        {children}
        <Fade
          truthy={!loading}
          init={0}
          transition={{ duration: 2, ease: "anticipate" }}
        >
          <Nav mobile={mobile} setMobile={setMobile} home={home} />
        </Fade>
        <Fade truthy={pathname === "/about"} init={0}>
          <About setLoading={setLoading} />
        </Fade>
        <Fade truthy={pathname === "/"} init={0}>
          <Landscape
            pages={1 + projects.length}
            damping={0.1}
            horizontal={!mobileOnly}
          >
            <Scroll html>
              <div className=" relative top-0 left-0 mt-16 flex !h-full !translate-x-0 !translate-y-0 flex-col overflow-scroll py-16 md:flex-row">
                <Home />
                {projects.length &&
                  projects.map((project: ProjectType, i) => (
                    <Project key={i} {...project} />
                  ))}
              </div>
            </Scroll>
            <Scroll>
              <Scan
                theme={theme}
                position={mobileOnly ? [4, 0, 0] : [7, -2, 0]}
                scale={mobileOnly ? 0.3 : 0.5}
              />
            </Scroll>
            <PresentationControls snap>
              <Device
                mobile={mobile}
                projects={projects}
                home={home}
                setHome={setHome}
              >
                <VideoMaterial
                  mobile={mobile}
                  projects={projects}
                  setLoading={setLoading}
                />
              </Device>
            </PresentationControls>
          </Landscape>
        </Fade>
      </body>
    </html>
  );
}
