export { Section } from "./Section";
export { SplashScreen } from "./SplashScreen";
import { motion, AnimatePresence } from "framer-motion";

export default function Fade({
  children,
  truthy,
}: {
  children: React.ReactNode;
  truthy: boolean;
}) {
  return (
    <AnimatePresence>
      {truthy ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "circOut" }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
