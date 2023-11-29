"use client";

import { Fade } from "(ui)";
import useMargin from "@hooks/useMargin";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname().split("/")[1];
  const margins = useMargin();

  return (
    <Fade
      init={0.3}
      pathname={pathname}
      style={{
        marginTop: margins[0],
        marginBottom: margins[1],
      }}
      className={`flex h-[stretch] flex-col items-center overflow-y-scroll  hyphens-auto px-1 md:px-8 md:py-2`}
    >
      {children}
    </Fade>
  );
}
