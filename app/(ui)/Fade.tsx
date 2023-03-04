"use client";

import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

export function Fade({
  children,
  className,
  truthy,
  init = 1,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  truthy: boolean;
  init?: number;
} & HTMLMotionProps<"div">): JSX.Element {
  return (
    <AnimatePresence>
      {truthy ? (
        <motion.div
          {...props}
          className={className}
          initial={{ opacity: init }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "circOut" }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
