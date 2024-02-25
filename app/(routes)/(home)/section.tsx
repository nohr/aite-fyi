"use client";

import { delayed_pagination_animation } from "_components/animate/constants";
import { motion } from "framer-motion";

export default function Section({
  children,
  index,
  className,
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  return (
    <motion.section
      {...delayed_pagination_animation(index)}
      className={"max-w-prose px-2 md:ml-8 md:pl-1 md:pr-0 " + className}
    >
      {children}
    </motion.section>
  );
}
