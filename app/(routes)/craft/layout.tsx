export const metadata = {
  title: "craft",
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

export default async function CraftLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
