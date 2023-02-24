"use client";

import Link from "next/link";
import { useRouteChange } from "./useUtils";

export function Nav() {
  const { routeChange } = useRouteChange();

  // log to the console if the page has stopped scrolling

  const links = [
    { href: "/", label: "Home" },
    { href: "/page2", label: "Page2" },
    { href: "/page3", label: "Page3" },
    { href: "/about", label: "About" },
    { href: "/about2", label: "About2" },
    { href: "/about3", label: "About3" },
    { href: "/work", label: "Work" },
    { href: "/work2", label: "Work2" },
    { href: "/work3", label: "Work3" },
  ];
  return (
    <div className=" fixed top-2 right-2 z-[100] flex h-min w-fit flex-row flex-nowrap justify-between gap-x-1">
      {links.map(({ href, label }) => (
        <Link
          href={href}
          key={label}
          onClick={() => {
            routeChange();
          }}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
