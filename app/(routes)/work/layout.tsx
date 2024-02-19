export const metadata = {
  title: "work",
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

export default async function workLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
