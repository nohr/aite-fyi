export const metadata = {
  title: "craft",
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

export default async function CraftLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
