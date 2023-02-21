export { Section } from "./Section";
export { SplashScreen } from "./SplashScreen";
import { motion } from "framer-motion";

export default function Fade({
  children,
  truthy,
}: {
  children: React.ReactNode;
  truthy: boolean;
}) {
  return (
    <>
      {truthy ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      ) : null}
    </>
  );
}
