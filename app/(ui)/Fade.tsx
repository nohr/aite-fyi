"use client";

import useTheme from "@hooks/useTheme";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function Fade({
  children,
  className,
  init = 0,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  init?: number;
} & HTMLMotionProps<"div">): JSX.Element {
  const pathname = usePathname();
  // console.log(children);
  useTheme();
  return (
    <AnimatePresence initial={false} mode="wait">
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
