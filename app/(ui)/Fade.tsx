"use client";

import useTheme from "@hooks/useTheme";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

export function Fade({
  pathname,
  children,
  className,
  init = 0,
  ...props
}: {
  pathname: string;
  children: React.ReactNode;
  className?: string;
  init?: number;
} & HTMLMotionProps<"div">): JSX.Element {
  // const pathname = usePathname();
  // console.log(children);
  // console.log(window.location.pathname);

  useTheme();
  return (
    <AnimatePresence initial={true} mode="wait">
      <motion.main
        {...props}
        key={pathname}
        className={className}
        initial={{ opacity: init }}
        animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
        // transition={{ duration: 0.5, ease: "circOut" }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
