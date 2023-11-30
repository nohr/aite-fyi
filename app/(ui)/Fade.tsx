"use client";

import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

export function Fade({
  pathname,
  children,
  className,
  init = 0,
  ...props
}: {
  pathname: string;
  children: React.ReactNode;
  className?: string;
  init?: number;
} & HTMLMotionProps<"div">): JSX.Element {
  const standard_pagination_animation = {
    initial: {
      opacity: init,
      scale: 0.95,
      rotateX: -30,
      filter: "blur(7px)",
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0, 0.93, 0.42, 0.87] },
    },
    exit: {
      opacity: init,
      scale: 0.95,
      rotateX: -30,
      filter: "blur(7px)",
      transition: { duration: 0.2, ease: [0, 0.93, 0.42, 0.87] },
    },
  };
  return (
    <AnimatePresence initial={true} mode="wait">
      <motion.main
        {...props}
        key={pathname}
        className={className}
        {...standard_pagination_animation}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
