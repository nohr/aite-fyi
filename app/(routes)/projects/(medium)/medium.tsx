"use client";

import { Project } from "types/Project";
import Item from "./item";
import Arrows from "./arrows";
import { usePathname } from "next/navigation";
import { TbWorldWww } from "react-icons/tb";
import { useUIStore } from "(ui)";
import { useEffect } from "react";
import { PiPaintBrushFill } from "react-icons/pi";
import { AnimatePresence } from "framer-motion";

export default function Medium({
  children,
  medium,
  projects,
}: {
  children: React.ReactNode;
  medium: Project["medium"];
  projects: Project[];
}) {
  const current_project = useUIStore((s) => s.project);

  const medium_projects = projects.filter(
    (project) => project.medium === medium,
  );

  const { setState } = useUIStore;
  const param = usePathname().split("/")[2];

  useEffect(() => {
    if (!param) setState({ project: null });
  }, [param, setState]);

  const active = current_project?.medium === medium;
  // console.log(active);

  return (
    <>
      {(current_project?.medium === medium || !current_project) && (
        <li
          key={medium}
          className={
            "group/medium relative h-fit appearance-none overflow-visible rounded-sm px-0 transition-all duration-100 ease-in-out " +
            (active ? "w-full" : "w-full px-2 md:w-fit md:px-0")
          }
        >
          {param ? null : (
            <div className="absolute left-0 top-12 -z-10 h-[calc(100%-48px)] w-full bg-[var(--arc-palette-title,#e5e6e9ff)] opacity-0 backdrop-blur-md transition-all duration-150 ease-in-out group-hover/medium:opacity-60 md:group-hover/medium:shadow-sm dark:bg-[var(--arc-palette-backgroundExtra,#060a0c)] " />
          )}
          <Arrows projects={medium_projects}>
            {!current_project && (
              <h2 className=" flex h-12 w-full select-none items-center justify-start gap-1 border-b border-current px-2 font-serif text-2xl font-light tracking-tighter [&_svg]:h-[1.75rem] [&_svg]:w-auto ">
                {medium === "website" ? (
                  <>
                    <TbWorldWww className=" -right-[0.03rem] -top-[0.2rem] opacity-40" />
                    Websites
                  </>
                ) : medium === "interactive" ? (
                  "Interactive"
                ) : medium === "design" ? (
                  <>
                    <PiPaintBrushFill className=" -right-[0.03rem] -top-[0.2rem] opacity-40" />
                    Graphics
                  </>
                ) : (
                  medium
                )}
              </h2>
            )}
            <div
              className={`nowrap w-full flex-row flex-wrap items-start justify-start gap-2 py-4 md:py-0 ${
                active
                  ? "flex"
                  : "grid grid-cols-2 min-[420px]:grid-cols-3 sm:grid-cols-4 md:flex"
              } 
                  `}
            >
              <AnimatePresence>
                {medium_projects.map((project) => (
                  <Item key={project._id} project={project}>
                    {children}
                  </Item>
                ))}
              </AnimatePresence>
            </div>
          </Arrows>
        </li>
      )}
    </>
  );
}
