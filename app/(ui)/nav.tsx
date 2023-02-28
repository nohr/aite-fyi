"use client";

import Link from "next/link";
import { useCallback, useEffect } from "react";
import { useRouteChange, useTimeout } from "./useUtils";
import { usePathname } from "next/navigation";
import { Fade } from "./Fade";
import { useWorldStore } from "(world)/useWorldStore";
import { Minimap } from "(world)/Minimap";
import { MinimapProps } from "./ui";
import { useUIStore } from "./useUIStore";

const links = [
  { href: "/about" },
  { href: "/professional" },
  { href: "/personal" },
  { href: "/contact" },
];

export function Nav({ ...props }: MinimapProps) {
  const { routeChange } = useRouteChange();
  const zoom = useWorldStore((state) => state.zoom);
  // const fade = useUIStore((state) => state.fade);
  const setFade = useUIStore((state) => state.setFade);
  const { reset } = useTimeout(() => setFade(false), 2000);

  // on mouse move, reset the fade timer
  const handleFade = useCallback(() => {
    setFade(true);
    reset();
  }, [reset, setFade]);

  useEffect(() => {
    document.addEventListener("mousemove", handleFade);
    document.addEventListener("scroll", handleFade);
    return () => {
      document.removeEventListener("mousemove", handleFade);
      document.removeEventListener("scroll", handleFade);
    };
  }, [handleFade]);

  const pathname = usePathname();
  // const home = pathname === "/";

  const visible = (href: string) => href !== pathname;
  return (
    <nav
      // truthy={true}
      // truthy={(fade && !zoom) || (home && !zoom)}
      className="fixed top-0 left-0 z-[90] flex h-16 w-screen flex-row items-center p-0 backdrop-blur-xl"
    >
      <Link
        href="/"
        className="flex h-full w-1/3 items-end border-b-[1px] border-r-[1px] border-current px-2 text-lg uppercase transition-colors duration-100 hover:bg-zinc-900 hover:text-zinc-600"
      >
        home
      </Link>
      <div
        // truthy={!zoom}
        className=" flex h-full w-full flex-row border-b-[1px] border-current"
      >
        {links.map(({ href }) => (
          <Fade
            key={href}
            truthy={visible(href)}
            className="flex h-full w-fit"
            style={{
              transformOrigin: "50% 50%",
            }}
          >
            <Link
              href={href}
              onClick={() => {
                routeChange();
              }}
              className=" flex items-end px-2 text-lg uppercase transition-colors duration-100 hover:bg-zinc-900 hover:text-zinc-600"
            >
              {href.split("/")[1] || "home"}
            </Link>
          </Fade>
        ))}
      </div>
      {/* minimap */}
      <Minimap {...props} />
    </nav>
  );
}
