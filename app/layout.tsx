import "./globals.css";
import "@fontsource/delius";
import { Analytics } from "@vercel/analytics/react";
import Dom from "./dom";
import Loading from "./loading";
import { Suspense } from "react";
import { Noto_Serif_Display } from "next/font/google";
import localFont from "next/font/local";

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
  title: "Aite, for your info",
  description: "Personal website of Aite Aigbe",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#C5C4CE" },
    { media: "(prefers-color-scheme: dark)", color: "#121a20" },
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
      className={`notranslate font-medium antialiased ${Libre.variable} ${Heritage.variable}`}
    >
      <body className="flex flex-col">
        <Loading />
        <Suspense fallback={null}>
          <Dom>{children}</Dom>
        </Suspense>
        <Analytics debug={false} />
      </body>
    </html>
  );
}
