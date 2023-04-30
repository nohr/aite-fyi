"use client";

import { Fade } from "(ui)";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <Fade
      pathname={pathname}
      className="flex h-full flex-col overflow-scroll p-2"
    >
      {children}
    </Fade>
  );
}
