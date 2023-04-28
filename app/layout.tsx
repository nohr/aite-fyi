import "./globals.css";
import "@fontsource/delius";
import { Fade, Footer, Nav } from "(ui)";
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
        <Fade className="flex h-full flex-col overflow-scroll p-2">
          {children}
        </Fade>
        <Footer />
        <Composition />
      </body>
    </html>
  );
}
