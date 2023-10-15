"use client";

import { Fade } from "(ui)";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname().split("/")[1];
  const [margins, setMargins] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    function handleMargin() {
      const nav = document.querySelector("nav");
      const footer = document.querySelector("footer");
      const main = document.querySelector("main");

      if (!nav || !footer || !main) return;
      if (window.innerWidth > 768)
        setMargins([nav.clientHeight, footer.clientHeight]);
      else setMargins([footer.clientHeight, nav.clientHeight]);
    }

    handleMargin();
    window.addEventListener("resize", handleMargin);
    return () => window.removeEventListener("resize", handleMargin);
  }, []);

  return (
    <Fade
      init={0.3}
      pathname={pathname}
      style={{
        marginTop: margins[0],
        marginBottom: margins[1],
      }}
      className={`flex h-[stretch] flex-col items-center hyphens-auto px-1 md:px-8 md:py-2`}
    >
      {children}
    </Fade>
  );
}
