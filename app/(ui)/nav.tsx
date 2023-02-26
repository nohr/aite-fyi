"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouteChange, useTimeout } from "./useUtils";
import {
  animate,
  AnimationOptions,
  motion,
  Spring,
  useMotionValue,
  useScroll,
} from "framer-motion";
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

export function Nav() {
  const { routeChange } = useRouteChange();
  const zoom = useWorldStore((state) => state.zoom);
  const [fade, setFade] = useState(true);
  const { reset } = useTimeout(() => setFade(false), 2000);

  // on mouse move, reset the fade timer
  const handleMouseMove = useCallback(() => {
    setFade(true);
    reset();
  }, [reset]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);
  return (
    <Fade
      // truthy={true}
      truthy={fade && !zoom}
      className="pointer-events-none fixed bottom-0 left-0 z-[100] flex h-min w-full flex-row gap-x-2 p-4"
    >
      {links.map(({ href }) => (
        <Float
          key={href}
          href={href}
          onClick={() => {
            routeChange();
          }}
        >
          {href.split("/")[1] || "home"}
        </Float>
      ))}
    </Fade>
  );
}

interface FloatProps {
  children: string;
  href: string;
  onClick?: () => void;
}

// handle the float animation
function Float({ children, ...props }: FloatProps): JSX.Element {
  const pathname = usePathname();

  function visible(href: string) {
    return href !== pathname;
  }
  return (
    <Fade
      truthy={visible(props.href)}
      className="sticky mb-0 flex h-min w-fit rounded-md bg-current"
      style={{
        transformOrigin: "50% 50%",
      }}
    >
      <Link
        {...props}
        className="!pointer-events-auto p-1 text-[0.5rem] font-bold  uppercase text-white"
      >
        {children}
      </Link>
    </Fade>
  );
}
