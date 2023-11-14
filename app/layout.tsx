import "./globals.css";
import "@fontsource/delius";
import { Analytics } from "@vercel/analytics/react";
import Dom from "dom";

export const metadata = {
  title: "Aite, for your info...",
  description: "Personal website of Aite Eboigbe",
  themeColor: "var(--arc-palette-subtitle, #b5beb9ff)",
  viewport: {
    width: "device-width",
    initialScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased font-semibold ">
      <body className="relative">
        <Dom>{children}</Dom>
        <Analytics debug={false} />
      </body>
    </html>
  );
}
