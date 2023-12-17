"use client";

import { Project } from "types/Project";
import Item from "./item";
import Arrows from "./arrows";
import { usePathname } from "next/navigation";

export default function Medium({
  children,
  medium,
  projects,
}: {
  children: React.ReactNode;
  medium: Project["medium"];
  projects: Project[];
}) {
  const pathname = usePathname();
  const projects_page = pathname.includes("/projects/");

  return (
    <li key={medium} className=" h-fit w-full border border-current p-4">
      {!projects_page && (
        <h1 className=" flex h-12 w-full items-center justify-center font-serif font-black ">
          {medium}
        </h1>
      )}
      <div className=" nowrap flex w-fit flex-row flex-wrap items-start justify-start gap-2 py-4 lg:py-0">
        {projects.map((project) => (
          <Item key={project._id} project={project}>
            {children}
          </Item>
        ))}
        <Arrows projects={projects} />
      </div>
    </li>
  );
}
