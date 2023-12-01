"use client";

import { Project } from "types/Project";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSFX from "@hooks/useSFX";
import Image from "next/image";
// import Programs from "./[project]/Programs";

export default function ListItem({
  children,
  project,
}: {
  children: React.ReactNode;
  project: Project;
}) {
  const pathname = usePathname();
  const path = `/projects/${project?.slug}`;
  const active = path === pathname;
  const projects_page = pathname.includes("/projects/");

  const [play] = useSFX("/sfx/click.mp3");

  return (
    <>
      {project ? (
        <li
          className={`group flex flex-col gap-2  ${
            active
              ? " h-full w-full md:!w-[65ch] "
              : projects_page
                ? " max-md:last-of-type:pb-28 "
                : ""
          }`}
        >
          <Link
            href={active ? "/projects" : path}
            onClick={() => play()}
            className={`${
              !active
                ? ` pointer-events-auto relative w-fit flex-col-reverse gap-4 overflow-hidden p-2 hover:border-current hover:bg-current hover:shadow-md ${
                    projects_page && "!flex-row-reverse"
                  }`
                : "w-full flex-col md:pt-2"
            }  flex h-fit items-start gap-2 rounded-sm border border-transparent no-underline transition-all duration-200 hover:bg-opacity-20 hover:mix-blend-plus-lighter hover:dark:mix-blend-difference`}
          >
            <h2
              className={`pointer-events-auto flex select-none flex-row flex-nowrap justify-between gap-2 font-serif text-base font-semibold uppercase tracking-tight group-hover:mix-blend-plus-lighter dark:group-hover:mix-blend-difference ${
                active
                  ? "w-full border-b border-current italic active:!border"
                  : !projects_page
                    ? "w-full justify-between"
                    : "w-fit"
              }`}
            >
              {project.name}
              {/* {projects_page ? null : project ? (
                <Programs program={project.program} max={3} />
              ) : null} */}
            </h2>
            {active ? null : (
              <div
                className={`${
                  projects_page ? "h-10 w-10" : "h-48 w-48"
                } pointer-events-auto relative overflow-hidden rounded-sm shadow-md group-hover:animate-pulse`}
              >
                <Image
                  src={project.thumbnail}
                  alt={project.thumbnail}
                  fill
                  sizes="400px"
                  priority
                  className="pointer-events-none"
                  style={{ position: "absolute", objectFit: "cover" }}
                />
              </div>
            )}
            {/* {path !== pathname && <Image src={project.thumbnail} className=" absolute object-cover -z-[5] opacity-90 blur-sm" alt={project.thumbnail} fill />} */}
          </Link>
          {active && children}
        </li>
      ) : null}
    </>
  );
}
