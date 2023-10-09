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
        initial={{ opacity: init, scale:0.95}}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.25, ease: "circOut" } }}
        exit={{ opacity: init, scale: 0.95, transition: { duration: 0.05, ease: "circOut" } }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
