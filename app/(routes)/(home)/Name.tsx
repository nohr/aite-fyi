"use client";

import useSFX from "@hooks/useSFX";
import Image from "next/image";

export default function Name() {
  const [aite] = useSFX("/sfx/aite.wav");
  const [aigbe] = useSFX("/sfx/aigbe.wav");
  const pics = ["/selfies/pic1.png", "/selfies/pic2.png"];

  return (
    <h1 className=" flex cursor-pointer flex-row flex-nowrap items-center font-heritage text-6xl transition duration-150 ease-out [&>span:hover]:text-[var(--arc-palette-foregroundSecondary,#e5e6e9ff)] [&>span:hover]:drop-shadow-xl dark:[&>span:hover]:text-[var(--arc-palette-foregroundSecondary,#060a0c)] [&>span]:px-2">
      <span onMouseEnter={() => aite()}>aite</span>{" "}
      <Image
        src={pics[Math.floor(Math.random() * pics.length)]}
        alt="me!"
        width={45}
        height={45}
        className=" pointer-events-none aspect-square !h-fit select-none"
      />
      <span onMouseEnter={() => aigbe()}>aigbe</span>
    </h1>
  );
}
