"use client";

import { useInView } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Project } from "types/Project";
import Item from "./item";
import useSFX from "@hooks/useSFX";
import useDimensions from "@hooks/useDimensions";
import { memo, useEffect, useMemo, useRef } from "react";
import { useUIStore } from "@hooks/useUIStore";

export default function Grid({ projects }: { projects: Project[] }) {
  const searchParams = useSearchParams();
  const medium = searchParams.get("medium");
  const [play] = useSFX("/sfx/open.mp3", 0.75);
  const { width } = useDimensions();
  const columns = useUIStore((s) => s.columns);
  const { setState } = useUIStore;
  const grid = useRef<HTMLDivElement>(null!);
  const isInView = useInView(grid, { margin: "0px 0px -50% 0px" });

  useEffect(() => {
    setState({ columns: width > 1024 ? 3 : width > 640 ? 2 : 1 });
  }, [setState, width]);

  useEffect(() => {
    if (isInView.valueOf()) setState({ showTabs: true });
    else setState({ showTabs: false });
  }, [isInView, setState]);

  const props = useMemo(() => {
    return {
      medium,
      projects,
      play,
      className: `${
        width > 1024 ? "max-w-[33%]" : width > 640 ? "max-w-[49.66%]" : ""
      }`,
      columns,
    };
  }, [medium, projects, play, width, columns]);

  return (
    <div
      ref={grid}
      id="grid"
      className={`pointer-events-none flex w-full flex-row flex-nowrap items-start justify-start gap-x-1 gap-y-1 p-1 pb-14 md:pb-1 md:pl-2 md:pt-[80px] `}
    >
      <Column number={columns > 1 ? 0 : null} {...props} />
      <Column number={1} {...props} />
      <Column number={2} {...props} />
    </div>
  );
}

const Column = memo(function Column({
  medium,
  projects,
  play,
  number,
  columns,
  className = "",
}: {
  medium: string | null;
  projects: Project[];
  play: () => void;
  number: number | null;
  columns: number;
  className?: string;
}) {
  if (number && columns < number + 1) return null;
  return (
    <div className={`flex w-full flex-col gap-y-1 ${className}`}>
      {projects
        .filter((project) => !medium || project.medium.includes(medium))
        .map((project, index) => {
          if (number !== null && index % columns !== number) return null;
          return <Item key={project._id} project={project} play={play} />;
        })}
    </div>
  );
});
