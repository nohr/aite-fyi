import "./globals.css";
import "@fontsource/delius";
import { Analytics } from "@vercel/analytics/react";
import Loading from "./loading";
import { Suspense } from "react";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
import Nav from "_components/nav";

const Dom = dynamic(() => import("./dom"), {
  ssr: false,
});
const Media = dynamic(() => import("./(routes)/music/Media"));

const Heritage = localFont({
  src: "./Heritage-Display.otf",
  variable: "--font-heritage",
  display: "swap",
  preload: true,
});

const Garamond = localFont({
  src: "./CormorantGaramond-Regular.ttf",
  weight: "400",
  display: "swap",
  variable: "--font-serif",
});

export const metadata = {
  title: {
    template: "%s | aite.fyi",
    default: "Aitẹ Aigbe",
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
      className={`font-medium antialiased ${Garamond.variable} ${Heritage.variable}`}
    >
      <body className="scroll-pt-20">
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
