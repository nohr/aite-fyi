"use client";

import "./globals.css";
import "@fontsource/delius";
import { Footer, Nav } from "(ui)";
import { Canvas } from "(3D)";
import { usePathname } from "next/navigation";
import Media from "(ui)/Media";
import useColor from "@hooks/useColor";
import useDisablePinch from "@hooks/useDisablePinch";
// import Logo from "(ui)/logo";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname().split("/");
  const page = pathname[1];
  const params = pathname.slice(2);
  
  const color = useColor();
  useDisablePinch();

  return (
    <html lang="en">
      <head />
      <body className={(page !=="admin" ? "pointer-events-none" : "") + " relative flex h-[100dvh] w-[100dvw] flex-col"}>
        <Nav />
        {/* <Logo /> */}
        {children}
        <Footer />
        {page !== "admin" && <Canvas params={params} color={color} />}
        <Media />
      </body>
    </html>
  );
}
