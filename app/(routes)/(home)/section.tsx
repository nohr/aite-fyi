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
      className="w-full max-w-prose px-2 md:ml-8 md:pl-1 md:pr-0"
    >
      {children}
    </motion.section>
  );
}
