import { AnimatePresence, motion } from "framer-motion";

export default function Route({
  children,
  margin,
  pathname,
}: {
  children: React.ReactNode;
  margin: number;
  pathname: string;
}) {
  return (
    <AnimatePresence initial={true} mode="popLayout">
      <motion.main
        key={pathname}
        style={{ zIndex: pathname.includes("admin") ? 1000 : 1 }}
        className={`flex h-full flex-col items-center overflow-y-scroll hyphens-auto px-0`}
        {...standard_pagination_animation}
      >
        <span
          style={{ paddingTop: `${margin}px` }}
          className=" hidden md:block"
        />

        {children}

        <span
          style={{ paddingTop: `${margin}px` }}
          className="pt-4  md:hidden"
        />
      </motion.main>
    </AnimatePresence>
  );
}

export const standard_pagination_animation = {
  initial: {
    opacity: 0.3,
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
    opacity: 0.3,
    scale: 0.95,
    rotateX: -30,
    filter: "blur(7px)",
    transition: { duration: 0.2, ease: [0, 0.93, 0.42, 0.87] },
  },
};

export const delayed_pagination_animation = (i: number) => ({
  initial: {
    opacity: 0.3,
    scale: 0.95,
    rotateX: -30,
    filter: "blur(7px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0, 0.93, 0.42, 0.87], delay: i * 0.05 },
  },
  exit: {
    opacity: 0.3,
    scale: 0.95,
    rotateX: -30,
    filter: "blur(7px)",
    transition: { duration: 0.2, ease: [0, 0.93, 0.42, 0.87], delay: i * 0.05 },
  },
});
