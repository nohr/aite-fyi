"use client";

import "./globals.css";
import React, { useEffect } from "react";
import Cursor from "./(cursor)/Cursor";
import { SplashScreen } from "./(ui)";
import World from "./(world)/World";
import Nav from "./(ui)/nav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="hidebar flex h-full w-max flex-col overflow-y-scroll bg-zinc-300 text-red-500 dark:bg-black">
        <SplashScreen />
        <Nav />
        {children}
        <Cursor />
        <World />
      </body>
    </html>
  );
}
