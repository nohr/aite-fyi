import "./globals.css";
import React from "react";
import Cursor from "(cursor)";
import { SplashScreen, Nav } from "(ui)";
import World from "(world)";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className=" bg-white dark:bg-black">
      <head />
      <body className="hidebar flex h-full w-max flex-col overflow-y-scroll text-red-500 ">
        <SplashScreen />
        {/* <Nav /> */}
        {children}
        {/* <Cursor /> */}
        <World />
      </body>
    </html>
  );
}
