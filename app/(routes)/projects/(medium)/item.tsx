"use client";

import { Project } from "types/Project";
import Link from "next/link";
import useSFX from "@hooks/useSFX";
import Image from "next/image";
import { useUIStore } from "(ui)";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";

export default function Item({
  children,
  project,
}: {
  children: React.ReactNode;
  project: Project;
}) {
  const path = `/projects/${project?.slug}`;
  const [play] = useSFX("/sfx/click2.mp3");
  const { setState } = useUIStore;
  const current_project = usePathname().split("/")[2];
  const active = current_project && current_project === project?.slug;

  useEffect(() => {
    if (active) setState({ project });
  }, [active, project, setState]);

  return (
    <>
      {project ? (
        <div
          className={`group/item flex flex-col gap-2  ${
            active ? " h-fit w-full pb-4 md:max-w-[65ch] md:pb-0 " : ""
          }`}
        >
          <Link
            href={active ? "/projects" : path}
            onClick={() => play()}
            className={`${
              !active
                ? ` pointer-events-auto relative w-fit flex-auto flex-col-reverse  overflow-hidden p-2 hover:border-current hover:shadow-md focus:border-current focus:shadow-md ${
                    current_project && "!flex-row-reverse  "
                  }`
                : "w-full flex-col px-2 md:pr-0 md:pt-2"
            }  flex h-fit items-start gap-2 rounded-sm border-transparent no-underline transition-all duration-100`}
          >
            {!active && (
              <div className="absolute left-0 top-0 -z-10  h-full w-full bg-current opacity-0 backdrop-blur-md transition-all duration-100 ease-in-out group-hover/item:opacity-90 group-hover/item:shadow-sm " />
            )}
            <h1
              className={` text-md pointer-events-auto flex select-none flex-row flex-nowrap justify-between gap-2 lowercase tracking-tight  ${
                active
                  ? " w-full border-b border-current font-serif text-4xl font-light italic md:text-5xl md:hover:animate-pulse "
                  : " group-hover/item:text-[var(--arc-palette-title,#e5e6e9ff)] dark:group-hover/item:text-[var(--arc-palette-backgroundExtra,#060a0c)] "
              }`}
            >
              {project.name}
              {active ? <IoMdClose className="my-auto h-8 p-2" /> : null}
            </h1>
            {active ? null : (
              <div
                className={`${
                  current_project
                    ? "h-6 w-6 md:h-10 md:w-10"
                    : "h-36 w-36 md:h-48 md:w-48"
                } pointer-events-auto relative overflow-hidden rounded-sm shadow-md`}
              >
                <Image
                  src={project.thumbnail}
                  alt={project.thumbnail}
                  fill
                  sizes="400px"
                  priority
                  className="pointer-events-none select-none"
                  style={{ position: "absolute", objectFit: "cover" }}
                />
              </div>
            )}
          </Link>
          {active && children}
        </div>
      ) : null}
    </>
  );
}
