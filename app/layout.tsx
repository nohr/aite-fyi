"use client";

import "./globals.css";
import React from "react";
import Cursor from "./(cursor)/Cursor";
import { SplashScreen } from "./(ui)";
import { About, Home, Work, Work3 } from "./(routes)";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="flex h-full w-max flex-col overflow-y-scroll text-red-500">
        <SplashScreen />
        {children}
        <Cursor />
        {/* pages */}
        <div className="pages">
          <div className="flex h-screen w-max flex-row flex-nowrap ">
            <Home />
            <About />
            <Work />
          </div>
          <div className="flex h-screen w-max flex-row flex-nowrap ">
            <About />
            {/* real home */}
            <Home />
            <Work />
          </div>
          <div className="flex h-screen w-max flex-row flex-nowrap ">
            <Home />
            <About />
            <Work3 />
          </div>
        </div>
        {/* handlers */}
      </body>
    </html>
  );
}
