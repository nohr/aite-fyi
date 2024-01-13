import { motion } from "framer-motion";
import { MouseEvent, useRef, useState } from "react";

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

const Slider = ({ min, max, value, onChange }: SliderProps) => {
  // make a fill slider with divs
  const range = max - min;
  const percentage = ((value - min) / range) * 100;
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault?.();
    // console.log(e);

    const target = e.target as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    const percent = offsetX / width;
    const newValue = min + percent * range;
    onChange(newValue);
  };

  const [mouseDown, setMouseDown] = useState(false);
  return (
    <motion.div
      ref={ref}
      onMouseDown={(e) => {
        setMouseDown(true);
        handleMouseMove(e);
      }}
      onMouseUp={() => setMouseDown(false)}
      onMouseMove={(e) => mouseDown && handleMouseMove(e)}
      onTouchStart={(e) => {
        setMouseDown(true);
        //   @ts-expect-error todo handle touch events as well as mouse events
        handleMouseMove(e.touches[0]);
      }}
      onTouchEnd={() => setMouseDown(false)}
      //   @ts-expect-error todo handle touch events as well as mouse events
      onTouchMove={(e) => mouseDown && handleMouseMove(e.touches[0])}
      className="group/track !pointer-events-auto flex h-4 w-full  cursor-pointer select-none items-center overflow-hidden rounded-full border border-current bg-transparent md:h-3.5"
    >
      <div
        className="pointer-events-none h-full bg-current group-active/track:opacity-50 md:group-hover/track:opacity-50"
        style={{ width: `${percentage}%` }}
      />
      {/* <div className="slider__thumb" /> */}
    </motion.div>
  );
};

export default Slider;
