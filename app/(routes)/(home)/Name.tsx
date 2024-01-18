"use client";

import { standard_pagination_animation } from "_components/animate/route";
import Image from "next/image";
import { RiSpeakFill } from "react-icons/ri";
import useSound from "use-sound";
import { motion } from "framer-motion";

const Name = function ({ pic }: { pic: string }): JSX.Element {
  const [aite] = useSound("/sfx/aite.wav", { volume: 0.35, interrupt: true });
  const [aigbe] = useSound("/sfx/aigbe.wav", { volume: 0.35, interrupt: true });

  return (
    <motion.h1
      {...standard_pagination_animation}
      className="flex flex-row flex-nowrap items-center overflow-visible px-3 pb-1 pl-1 font-serif text-6xl font-light capitalize italic tracking-tight transition duration-150 ease-in-out md:px-8 [&>span]:overflow-visible [&>span]:px-1.5  "
    >
      <span
        className="group/aite relative cursor-pointer drop-shadow active:text-[#060a0c] active:dark:text-[#e0e0e0]"
        onClick={() => aite()}
      >
        <RiSpeakFill className="absolute top-2  hidden h-4 w-4 group-active/aite:block md:group-hover/aite:block" />
        aitẹ
      </span>
      <span
        className="group/aigbe relative cursor-pointer drop-shadow active:text-[#060a0c] active:dark:text-[#e0e0e0]"
        onClick={() => aigbe()}
      >
        <RiSpeakFill className="absolute top-1  hidden h-4 w-4 group-active/aigbe:block md:group-hover/aigbe:block" />
        aigbe
      </span>
      <Image
        suppressHydrationWarning
        src={pic}
        alt="me!"
        width={45}
        height={45}
        className="pointer-events-none aspect-square !h-fit w-auto select-none pl-2"
      />
    </motion.h1>
  );
};

export default Name;
