import { type HtmlProps } from "@react-three/drei/web/Html";
import { MotionValue, type WillChange } from "framer-motion";

interface WorldProps {
  world?: React.RefObject<HtmlProps | HTMLDivElement>;
  wrapper?: React.RefObject<HTMLDivElement>;
  screen?: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
  style: {
    scale?: MotionValue<number>;
    rotateX: MotionValue<number>;
    rotateY: MotionValue<number>;
    translateX?: MotionValue<number>;
    translateY?: MotionValue<number>;
    willChange?: WillChange;
  };
}
