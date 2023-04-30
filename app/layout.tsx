"use client";
import "./globals.css";
import "@fontsource/delius";
import { Footer, Nav } from "(ui)";
import Composition from "(3D)";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className=" ">
      <head />
      <body className="pointer-events-none relative flex h-[100svh] w-screen flex-col">
        <Nav />

        {children}
        <Footer />
        <Composition />
      </body>
    </html>
  );
}
