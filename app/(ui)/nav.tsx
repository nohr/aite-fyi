"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouteChange, useTimeout } from "./useUtils";
import { usePathname } from "next/navigation";
import { Fade } from "./Fade";
import { useWorldStore } from "(world)/useWorldStore";

const links = [
  { href: "/" },
  { href: "/page2" },
  { href: "/page3" },
  { href: "/about" },
  { href: "/about2" },
  { href: "/about3" },
  { href: "/work" },
  { href: "/work2" },
  { href: "/work3" },
];

let x = 0;
export function Nav() {
  const { routeChange } = useRouteChange();
  const zoom = useWorldStore((state) => state.zoom);
  const [fade, setFade] = useState(true);
  const { reset } = useTimeout(() => setFade(false), 2000);
  x++;
  console.log("render nav", x);

  // on mouse move, reset the fade timer
  const handleMouseMove = useCallback(() => {
    setFade(true);
    reset();
  }, [reset]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const pathname = usePathname();

  function visible(href: string) {
    return href !== pathname;
  }
  return (
    <Fade
      // truthy={true}
      truthy={fade && !zoom}
      className="pointer-events-none fixed bottom-0 left-0 z-[100] flex h-min w-full flex-row gap-x-2 p-4"
    >
      {links.map(({ href }) => (
        <Fade
          key={href}
          truthy={visible(href)}
          className="sticky mb-0 flex h-min w-fit rounded-md bg-current"
          style={{
            transformOrigin: "50% 50%",
          }}
        >
          <Link
            href={href}
            onClick={() => {
              routeChange();
            }}
            className="!pointer-events-auto p-1 text-[0.5rem] font-bold  uppercase text-white"
          >
            {href.split("/")[1] || "home"}
          </Link>
        </Fade>
      ))}
    </Fade>
  );
}
