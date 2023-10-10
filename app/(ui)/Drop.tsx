"use client";

import { motion } from "framer-motion";
import React from "react";

export default function Drop({
  children,
  className,
  key = null,
}: {
  children: React.ReactNode;
  className: string;
  key?: string | null;
}) {
  const mot = {
    initial: { y: -20, opacity: 0.4, rotateX: -90 },
    animate: { y: 0, opacity: 1, rotateX: 0 },
    transition: { ease: "linear", bounce: 0, duration: 0.2 },
  };

  return (
    <motion.div {...mot} key={key} className={className}>
      {children}
    </motion.div>
  );
}
