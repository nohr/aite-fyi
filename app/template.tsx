"use client";

import { Fade } from "(ui)";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname().split("/")[1];

  return (
    <Fade
      init={0.3}
      pathname={pathname}
      className=" flex items-center h-full flex-col order-2 hyphens-auto px-1 md:px-8 md:py-2 "
    >
      {children}
    </Fade>
  );
}
