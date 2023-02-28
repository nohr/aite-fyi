"use client";

import "./globals.css";
import React from "react";
import Cursor from "(cursor)";
import { Nav, SplashScreen } from "(ui)";
import { World, useWorld } from "(world)";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    world,
    wrapper,
    screen,
    scale,
    rotateX,
    rotateY,
    translateY,
    translateX,
  } = useWorld();
  return (
    <html lang="en" className=" bg-zinc-600">
      <head />
      <body
        className="hidebar flex h-max w-full flex-col overflow-x-scroll text-zinc-900 selection:bg-zinc-900 selection:text-zinc-600
"
      >
        <SplashScreen />
        <Nav
          wrapper={wrapper}
          screen={screen}
          style={{ rotateX, rotateY, translateY, translateX }}
        />
        {children}
        {/* <Cursor /> */}
        <World ref={world} style={{ scale, rotateX, rotateY }} />
      </body>
    </html>
  );
}
