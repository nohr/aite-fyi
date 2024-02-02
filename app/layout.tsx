import "./globals.css";
import "@fontsource/delius";
import { Analytics } from "@vercel/analytics/react";
import Loading from "./loading";
import { Suspense } from "react";
import { Noto_Serif_Display } from "next/font/google";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
import Nav from "_components/nav";

const Media = dynamic(() => import("./(routes)/music/Media"));
const Dom = dynamic(() => import("./dom"), {
  ssr: false,
});

const Heritage = localFont({
  src: "./Heritage-Display.otf",
  variable: "--font-heritage",
  display: "swap",
  preload: true,
});

const Libre = Noto_Serif_Display({
  display: "swap",
  variable: "--font-serif",
  preload: false,
});

export const metadata = {
  title: {
    template: "%s | aite.fyi",
    default: "aitẹ, for your info",
  },
  description: "Personal website of Aitẹ Aigbe",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e0e0e0" },
    { media: "(prefers-color-scheme: dark)", color: "#131313" },
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
      <body>
        <Loading />
        <Suspense fallback={null}>
          <Nav />
          {children}
          <Dom />
          <Media />
        </Suspense>
        <Analytics debug={false} />
      </body>
    </html>
  );
}
