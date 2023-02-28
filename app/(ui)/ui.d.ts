import { MotionValue, type WillChange } from "framer-motion";

interface WorldProps {
  world?: React.RefObject<HTMLDivElement | null>;
  wrapper?: React.RefObject<HTMLDivElement>;
  screen?: React.RefObject<HTMLDivElement>;
  style: {
    scale?: MotionValue<number>;
    rotateX: MotionValue<number>;
    rotateY: MotionValue<number>;
    translateX?: MotionValue<number>;
    translateY?: MotionValue<number>;
    willChange?: WillChange;
  };
}
