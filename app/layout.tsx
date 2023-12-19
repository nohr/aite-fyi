import "./globals.css";
import "@fontsource/delius";
import { Analytics } from "@vercel/analytics/react";
import Dom from "./dom";
import Loading from "./loading";
import { Suspense } from "react";
import { Noto_Serif_Display } from "next/font/google";
import localFont from "next/font/local";
import type { Metadata } from "next";

const Heritage = localFont({
  src: "./Heritage-Display.otf",
  variable: "--font-heritage",
  display: "swap",
});

const Libre = Noto_Serif_Display({
  display: "swap",
  variable: "--font-serif",
});

type Props = {
  params: { project: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  // read route params
  console.log(params, searchParams);

  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: params.project || "Aite, for your info",
    description: "Personal website of Aite Aigbe",
  };
}

export function generateViewport({ params }: Props) {
  return {
    themeColor: [
      {
        media: "(prefers-color-scheme: light)",
        color: " #838396",
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
}

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
