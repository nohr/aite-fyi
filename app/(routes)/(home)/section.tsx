"use client";

import { delayed_pagination_animation } from "_components/animate/route";
import { motion } from "framer-motion";

export default function Section({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.section
      {...delayed_pagination_animation(index)}
      className="w-full max-w-prose pl-1 md:ml-8"
    >
      {children}
    </motion.section>
  );
}
