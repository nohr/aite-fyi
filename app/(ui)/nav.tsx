"use client";

import Link from "next/link";
import { memo } from "react";
import { useRouteChange } from "./useUtils";
import { usePathname } from "next/navigation";
import { Fade } from "./Fade";
import { useWorldStore } from "(world)/useWorldStore";
import { Minimap } from "(world)/Minimap";
import { WorldProps } from "./ui";

const links = [
  { href: "/about" },
  { href: "/professional" },
  { href: "/personal" },
  { href: "/contact" },
];

export const Nav = memo(function Nav({ ...props }: WorldProps) {
  const { routeChange } = useRouteChange();
  const zoom = useWorldStore((state) => state.zoom);
  const wrapper_width = useWorldStore((state) => state.wrapper_width);
  const pathname = usePathname();
  const active = (href: string) => href === pathname;

  // console.log("rendering nav");

  return (
    <nav className="fixed top-0 left-0 z-[90] flex h-16 w-screen select-none flex-row items-center justify-end p-0">
      <Fade
        truthy={!zoom}
        className="inline-flex h-full w-full flex-row border-b-[1px] border-current backdrop-blur-lg"
      >
        <Link
          href="/"
          style={{ width: wrapper_width }}
          className="flex h-full items-end  border-r-[1px] border-zinc-900 px-2 text-lg uppercase backdrop-blur-lg transition-colors  duration-100 hover:bg-zinc-900 hover:text-zinc-200 hover:dark:text-zinc-600"
        >
          Æ
        </Link>
        {links.map(({ href }) => (
          <Link
            key={href}
            href={href}
            onClick={() => {
              routeChange();
            }}
            className={`flex items-end px-2 text-lg uppercase transition-colors duration-100 ${
              active(href)
                ? "bg-zinc-900 text-zinc-200 dark:text-zinc-600"
                : "bg-transparent text-zinc-900 hover:bg-zinc-900 hover:text-zinc-200 hover:dark:text-zinc-600"
            } `}
          >
            {href.split("/")[1] || "home"}
          </Link>
        ))}
      </Fade>
      <Minimap {...props} />
    </nav>
  );
});
