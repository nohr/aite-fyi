import "./globals.css";
import React from "react";
import Cursor from "(cursor)";
import { Nav, SplashScreen } from "(ui)";
import World from "(world)";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className=" bg-white dark:bg-black">
      <head />
      <body className="hidebar flex h-max w-full flex-row overflow-x-scroll text-red-500 ">
        <SplashScreen />
        <Nav />
        {children}
        {/* <Cursor /> */}
        <World />
      </body>
    </html>
  );
}
