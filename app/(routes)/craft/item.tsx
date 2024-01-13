"use client";

import { Project } from "types/Project";
import Link from "next/link";
import useSFX from "@hooks/useSFX";
import Image from "next/image";
import { motion } from "framer-motion";
import { delayed_pagination_animation } from "_components/animate/route";

export default function Item({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const path = `/craft/${project?.slug}`;
  const [play] = useSFX("/sfx/open.mp3");

  return (
    <motion.div
      {...delayed_pagination_animation(index)}
      className={`group/item flex h-60 w-1/2 flex-col gap-0 p-3 md:w-1/3`}
    >
      <Link
        href={path}
        onClick={() => play()}
        className={`pointer-events-auto relative w-full flex-auto flex-col-reverse overflow-hidden hover:border-current hover:shadow-md focus:border-current focus:shadow-md`}
      >
        <div className="absolute left-0 top-0 -z-10 h-full w-full bg-current opacity-0 backdrop-blur-md transition-all duration-100 ease-in-out group-hover/item:opacity-90 group-hover/item:shadow-sm " />

        {/* <p
          className={` text-md pointer-events-auto flex select-none flex-row flex-nowrap justify-between gap-2 lowercase tracking-tight   group-hover/item:text-[var(--arc-palette-title,#e0e0e0)] dark:group-hover/item:text-[var(--arc-palette-backgroundExtra,#060a0c)]`}
        >
          {project.name}
        </p> */}

        {project.videos?.[9] ? (
          <video
            autoPlay={true}
            playsInline
            muted
            loop
            preload="metadata"
            key={project.videos[0]._key}
            src={project.videos[0].url}
            controls={false}
            className={`pointer-events-none absolute w-full object-cover shadow-lg`}
          />
        ) : (
          <Image
            src={project.thumbnail}
            alt={project.thumbnail}
            fill
            sizes="400px"
            priority
            className="pointer-events-none select-none"
            style={{ position: "absolute", objectFit: "cover" }}
          />
        )}
      </Link>
    </motion.div>
  );
}
