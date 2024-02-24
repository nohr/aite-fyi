"use client";

import { useUIStore } from "@hooks/useUIStore";

export default function Template({ children }: { children: React.ReactNode }) {
  const margin = useUIStore((s) => s.navHeight);

  return (
    <>
      <span
        style={{ paddingTop: `${margin}px` }}
        className=" hidden md:block"
      />

      {children}

      <span style={{ paddingTop: `${margin}px` }} className="block md:hidden" />
    </>
  );
}
