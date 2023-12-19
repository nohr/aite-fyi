"use client";

import { Fade } from "(ui)";
import useMargin from "@hooks/useMargin";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname().split("/")[1];
  const margins = useMargin();
  return (
    <>
      <Fade
        init={0.3}
        pathname={pathname}
        className={`flex h-full flex-col items-start overflow-y-scroll hyphens-auto px-0 md:px-8 md:py-2`}
      >
        <span
          style={{
            display: "block",
            paddingTop: margins[0],
          }}
        />
        {children}
        <span
          style={{
            display: "block",
            paddingTop: margins[1],
          }}
        />
      </Fade>
    </>
  );
}
