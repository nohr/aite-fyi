"use client";
import "./globals.css";
import "@fontsource/delius";
import { Fade, Footer, Nav } from "(ui)";
import Composition from "(3D)";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <html lang="en" className=" ">
      <head />
      <body className="pointer-events-none relative flex h-[100svh] w-screen flex-col">
        <Nav />
        <Fade
          pathname={pathname}
          className="flex h-full flex-col overflow-scroll p-2"
        >
          {children}
        </Fade>
        <Footer />
        <Composition />
      </body>
    </html>
  );
}
