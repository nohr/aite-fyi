"use client";

import useSFX from "@hooks/useSFX";
import Image from "next/image";

const Name = function ({ pic }: { pic: string }): JSX.Element {
  const [aite] = useSFX("/sfx/aite.wav");
  const [aigbe] = useSFX("/sfx/aigbe.wav");

  return (
    <h1 className=" flex flex-row flex-nowrap items-center font-serif text-6xl font-light capitalize italic tracking-tight transition duration-150 ease-out [&>span]:px-2  ">
      <span
        className="cursor-pointer drop-shadow hover:drop-shadow-xl active:text-[#060a0c] active:drop-shadow-xl md:hover:text-[var(--arc-palette-foregroundSecondary,#e5e6e9ff)] active:dark:text-[#e5e6e9ff] md:dark:hover:text-[var(--arc-palette-foregroundSecondary,#060a0c)] "
        onClick={() => aite()}
      >
        aite
      </span>
      <span
        className="cursor-pointer drop-shadow hover:drop-shadow-xl active:text-[#060a0c] active:drop-shadow-xl md:hover:text-[var(--arc-palette-foregroundSecondary,#e5e6e9ff)] active:dark:text-[#e5e6e9ff] md:dark:hover:text-[var(--arc-palette-foregroundSecondary,#060a0c)] "
        onClick={() => aigbe()}
      >
        aigbe
      </span>
      <Image
        suppressHydrationWarning
        src={pic}
        alt="me!"
        width={45}
        height={45}
        className=" pointer-events-none aspect-square !h-fit select-none"
      />{" "}
    </h1>
  );
};

export default Name;