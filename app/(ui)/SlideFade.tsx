"use client";

import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

export function SlideFade({
  children,
  className,
  truthy,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  truthy: boolean;
} & HTMLMotionProps<"div">): JSX.Element {
  return (
    <AnimatePresence>
      {truthy ? (
        <motion.div
          {...props}
          className={className}
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "min-content" }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ duration: 0.75, ease: "circOut" }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
