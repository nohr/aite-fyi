"use client";

import useTheme from "@hooks/useTheme";
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
  // const pathname = usePathname();
  // console.log(children);
  // console.log(window.location.pathname);

  useTheme();

  const standard_pagination_animation = {
    initial: { opacity: init, scale: 0.95, rotateX: -30 },
    animate: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: { duration: 0.25, ease: "circOut" },
    },
    exit: {
      opacity: init,
      scale: 0.95,
      rotateX: -30,
      transition: { duration: 0.05, ease: "circOut" },
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
