"use client";

import { AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Project } from "types/Project";
import Item from "./item";

export default function Grid({ projects }: { projects: Project[] }) {
  const searchParams = useSearchParams();
  const medium = searchParams.get("medium");

  return (
    <div
      className={`flex w-full flex-row flex-wrap items-start justify-start p-4 md:py-0`}
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => {
          if (medium && !project.medium.includes(medium)) return null;
          return <Item key={project._id} project={project} index={index} />;
        })}
      </AnimatePresence>
    </div>
  );
}
