"use client";

import { memo, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { standard_pagination_animation } from "./animate/route";

export default memo(function NavPortal({
  children,
}: {
  children: React.ReactNode;
}) {
  // todo optimize this to only run once
  const [portals, setPortals] = useState<HTMLElement[] | undefined>();

  useEffect(() => {
    setPortals(Array.from(document.querySelectorAll("#nav-portal")));
  }, []);

  return (
    <>
      {portals?.map((p, i) =>
        createPortal(
          <motion.span
            key={i}
            {...standard_pagination_animation}
            className=" flex w-full items-center justify-center md:absolute md:px-8"
          >
            {children}
          </motion.span>,
          p,
          i.toString(),
        ),
      )}
    </>
  );
});

export function Portal({ className }: { className?: string }) {
  return (
    <AnimatePresence initial={true} mode="sync">
      <div id="nav-portal" className={className + " relative"}></div>
    </AnimatePresence>
  );
}
