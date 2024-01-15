"use client";

import { AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Project } from "types/Project";
import Item from "./item";
import useSFX from "@hooks/useSFX";

export default function Grid({ projects }: { projects: Project[] }) {
  const searchParams = useSearchParams();
  const medium = searchParams.get("medium");
  const [play] = useSFX("/sfx/open.mp3");

  return (
    <div
      className={`flex w-full flex-row flex-wrap items-start justify-start gap-y-1 md:px-1 `}
    >
      <div className="w-1/ h-0.5 bg-border"></div>
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => {
          if (medium && !project.medium.includes(medium)) return null;
          return (
            <Item
              key={project._id}
              name={project.name}
              index={index}
              play={play}
              path={`/craft/${project.slug}`}
              video={project.videos?.[0].url}
              thumbnail={project.thumbnail}
              program={project.program}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
