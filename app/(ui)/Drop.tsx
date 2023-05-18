"use client";

import { motion } from "framer-motion";
import React from "react";

export default function Drop({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const mot = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { ease: "linear", bounce: 0, duration: 0.1 },
  };

  return (
    <motion.div {...mot} className={className}>
      {children}
    </motion.div>
  );
}
