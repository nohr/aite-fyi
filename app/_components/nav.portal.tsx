"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { standard_pagination_animation } from "./animate/route";

export default function NavPortal({ children }: { children: React.ReactNode }) {
  const [portals, setPortals] = useState<HTMLElement[] | undefined>();

  useEffect(() => {
    setPortals(Array.from(document.querySelectorAll("#nav-portal")));
  }, []);

  return (
    <>
      {portals?.map((p, i) =>
        createPortal(
          <AnimatePresence initial={true} mode="popLayout">
            <motion.span
              {...standard_pagination_animation}
              className=" flex w-full items-center justify-center md:absolute md:px-4"
            >
              {children}
            </motion.span>
          </AnimatePresence>,
          p,
          i.toString(),
        ),
      )}
    </>
  );
}

export function Portal({ className }: { className?: string }) {
  return <div id="nav-portal" className={className + " relative"}></div>;
}
