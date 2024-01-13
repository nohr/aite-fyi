"use client";

import { motion } from "framer-motion";

export default function Fade({
  children,
  className = "",
  key = null,
}: {
  children: React.ReactNode;
  className?: string;
  key?: string | null;
}) {
  const mot = {
    initial: { opacity: 0.4, filter: "blur(7px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    transition: { ease: "linear", bounce: 0, duration: 0.2 },
  };

  return (
    <motion.div {...mot} key={key} className={className}>
      {children}
    </motion.div>
  );
}
