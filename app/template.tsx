"use client";

import { Fade } from "(ui)";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname().split("/")[1];

  return (
    <Fade pathname={pathname} className=" flex h-[100svh] flex-col px-8 py-2">
      {children}
    </Fade>
  );
}
