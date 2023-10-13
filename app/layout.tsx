import "./globals.css";
import "@fontsource/delius";
import { Footer, Nav } from "(ui)";
import { Canvas } from "(3D)";
import Media from "(ui)/Media";

export const metadata = {
  title: "Aite, for your info...",
  description: "Personal website of Aite Eboigbe",
  themeColor: "var(--arc-palette-subtitle, #96BDD5FF)",
  viewport: {
    width: "device-width",
    initialScale: 1,
    userScalable: false,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <head />
      <body className="pointer-events-none relative flex h-[100dvh] w-[100dvw] flex-col">
        <Nav />
        {children}
        <Footer />
        <Canvas />
        <Media />
      </body>
    </html>
  );
}
