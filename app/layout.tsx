import "./globals.css";
import "@fontsource/delius";
import { Analytics } from "@vercel/analytics/react";
import Dom from "dom";
import Loading from "loading";
import { Suspense } from "react";

export const metadata = {
  title: "Aite, for your info...",
  description: "Personal website of Aite Aigbe",
};

export const viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: " #D4BDBE",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: " #121a20",
    },
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
    <html lang="en" className=" font-medium antialiased ">
      <body className="relative">
        <Loading />
        <Suspense fallback={null}>
          <Dom>{children}</Dom>
        </Suspense>
        <Analytics debug={false} />
      </body>
    </html>
  );
}
