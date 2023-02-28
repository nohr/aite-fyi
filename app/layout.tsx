"use client";

import "./globals.css";
import React, { useRef } from "react";
import Cursor from "(cursor)";
import { Nav, SplashScreen } from "(ui)";
import { World, useWorld } from "(world)";
import { Landscape } from "(world)/(3D)/Landscape";
import { Dom } from "(world)/(3D)/HtmlWorld";

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
    <html lang="en" className=" bg-zinc-200 dark:bg-zinc-600">
      <head />
      <body
        className="[&>div]hidebar relative flex h-max w-full flex-col overflow-x-scroll text-zinc-900 selection:bg-zinc-900 selection:text-zinc-200 selection:dark:text-zinc-600
"
      >
        {/* <SplashScreen /> */}
        {/* <Cursor /> */}
        {/* <World ref={world} style={{ scale, rotateX, rotateY }} /> */}
        {children}
        <Nav
          wrapper={wrapper}
          screen={screen}
          style={{ rotateX, rotateY, translateY, translateX }}
        />
        <Landscape>
          <Dom world={world} />
        </Landscape>
      </body>
    </html>
  );
}
