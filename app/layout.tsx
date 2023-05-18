"use client";
import "./globals.css";
import "@fontsource/delius";
import { Footer, Nav } from "(ui)";
import Composition from "(3D)";
import { usePathname } from "next/navigation";
import { Device } from "(3D)/Device";
import { Scan } from "(3D)/Scan";
import Media from "(ui)/Media";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const params = pathname.split("/").slice(2);

  return (
    <html lang="en" className=" ">
      <head />
      <body className="pointer-events-none relative flex h-[100svh] w-screen flex-col">
        <Nav />
        {children}
        <Footer />
        <Composition>
          {pathname.includes("/projects/") ? (
            <Device params={params} />
          ) : (
            <Scan />
          )}
        </Composition>
        <Media />
      </body>
    </html>
  );
}
