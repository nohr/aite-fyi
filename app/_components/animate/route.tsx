// import { AnimatePresence, motion } from "framer-motion";

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
    // <AnimatePresence initial={true} mode="popLayout">
    <main
      // key={pathname}
      style={{ zIndex: pathname.includes("admin") ? 1000 : 1 }}
      className={`relative flex h-full flex-col items-start overflow-y-scroll px-0 `}
      // {...standard_pagination_animation}
    >
      <span
        style={{ paddingTop: `${margin}px` }}
        className=" hidden md:block"
      />

      {children}

      <span style={{ paddingTop: `${margin}px` }} className="pt-4 md:hidden" />
    </main>
    // </AnimatePresence>
  );
}
