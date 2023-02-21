"use client";

import "./globals.css";
import React, { useEffect } from "react";
import Cursor from "./(cursor)/Cursor";
import { SplashScreen } from "./(ui)";
import World from "./(world)/World";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // when the page loads scroll to the middle of the body element
  // useEffect(() => {
  //   window.scrollTo(
  //     document.body.clientWidth / 2,
  //     document.body.clientHeight / 2
  //   );
  // }, []);

  return (
    <html lang="en">
      <head />
      <body className="flex h-full w-max flex-col overflow-y-scroll bg-zinc-300 text-red-500 dark:bg-black">
        <SplashScreen />
        {children}
        <Cursor />
        {/* map */}
        <World />
      </body>
    </html>
  );
}
