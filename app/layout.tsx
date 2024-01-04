import "./globals.css";
import "@fontsource/delius";
import { Analytics } from "@vercel/analytics/react";
import Loading from "./loading";
import { Suspense } from "react";
import { Noto_Serif_Display } from "next/font/google";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
import { Nav } from "(ui)";

const Media = dynamic(() => import("(ui)/Media"));
const Dom = dynamic(() => import("./dom"), {
  ssr: false,
});

const Heritage = localFont({
  src: "./Heritage-Display.otf",
  variable: "--font-heritage",
  display: "swap",
});

const Libre = Noto_Serif_Display({
  display: "swap",
  variable: "--font-serif",
  preload: false,
});

export const metadata = {
  title: {
    template: "%s | aite.fyi",
    default: "aite, for your info",
  },
  description: "Personal website of Aite Aigbe",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#b7b7b7" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1b1b" },
  ],
  width: "device-width",
  initialScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      translate="no"
      className={`font-medium antialiased ${Libre.variable} ${Heritage.variable}`}
    >
      <body className="flex flex-col">
        <Loading />
        <Suspense fallback={null}>
          <Nav />
          <Dom>{children}</Dom>
          <Media />
        </Suspense>
        <Analytics debug={false} />
      </body>
    </html>
  );
}
