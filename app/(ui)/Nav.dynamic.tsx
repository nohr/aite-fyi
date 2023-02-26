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
      truthy={fade && !zoom}
      className="pointer-events-none fixed top-0 bottom-0 z-[100] hidden p-16 md:flex"
      style={{
        height: innerHeight,
        width: innerWidth,
      }}
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
  const left = useMotionValue(0);
  const top = useMotionValue(0);

  const handleScroll = useCallback(
    function () {
      const page = document.getElementById(children) as HTMLElement;
      const pos = {
        x: page.getBoundingClientRect().x + page.offsetWidth / 2,
        y: page.getBoundingClientRect().y + page.offsetHeight / 2,
      };
      const transition = {
        duration: 0.1,
        type: "spring",
        damping: 10,
        stiffness: 100,
      } as Spring;
      animate(left, pos.x, transition);
      animate(top, pos.y, transition);
    },
    [children, left, top]
  );

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const pathname = usePathname();

  function visible(href: string) {
    return href !== pathname;
  }
  return (
    <Fade
      truthy={visible(props.href)}
      className="sticky mb-0 flex h-fit w-fit rounded-md bg-current"
      style={{
        left,
        top,
        transformOrigin: "50% 50%",
      }}
    >
      <Link
        {...props}
        className="!pointer-events-auto p-1 text-[0.5rem] font-bold  text-white"
      >
        {children}
      </Link>
    </Fade>
  );
}
