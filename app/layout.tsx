"use client";

import "./globals.css";
import React from "react";
import Camera from "./(ml)/Camera";
import About from "./(routes)/about";
import Work from "./(routes)/work";
import Home from "./(routes)/home";
import Work3 from "./(routes)/work3";
import Cursor from "./(ml)/(misc)/Cursor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="flex h-full w-max flex-col overflow-y-scroll text-red-500">
        {children}
        {/* pages */}
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
        {/* handlers */}
        <Camera />
        <Cursor />
      </body>
    </html>
  );
}
