"use client";

import { AnimatePresence, motion } from "framer-motion";

export function Fade({
  children,
  truthy,
}: {
  children: React.ReactNode;
  truthy: boolean;
}) {
  return (
    <AnimatePresence>
      {truthy ? (
        <motion.div
          initial={{ opacity: 0 }}
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
