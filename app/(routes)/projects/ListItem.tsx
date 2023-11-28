"use client";

import { Project } from "types/Project";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import useSFX from "@hooks/useSFX";
import Image from "next/image";
import { GrNext, GrPrevious } from "react-icons/gr";

export default function ListItem({
  children,
  project,
  projects,
}: {
  children: React.ReactNode;
  project: Project;
  projects: Project[];
}) {
  const pathname = usePathname();
  const path = `/projects/${project?.slug}`;
  const [play] = useSFX("/sfx/click.mp3");

  function handleDirection(n: number) {
    const index = projects.findIndex((p) => p._id === project._id);
    const nextIndex =
      index + n === projects.length
        ? 0
        : index + n < 0
          ? projects.length - 1
          : index + n;
    const nextSlug = projects[nextIndex]?.slug;

    if (nextSlug === undefined) return path;
    return nextSlug;
  }

  return (
    <>
      <li
        className={`group flex flex-col gap-2  ${
          path === pathname ? " h-full w-full md:!w-[65ch] " : ""
        }`}
      >
        <Link
          href={path === pathname ? "/projects" : path}
          onClick={() => play()}
          className={`${
            !pathname.includes(path)
              ? `pointer-events-auto relative w-fit flex-col-reverse gap-4 overflow-hidden rounded-sm p-2 hover:border-current ${
                  pathname.includes("/projects/") && "!flex-row-reverse"
                }`
              : "w-full flex-col "
          }  flex h-fit items-center gap-2 border border-transparent no-underline transition-all duration-75`}
        >
          <motion.h2
            className={` pointer-events-auto flex select-none flex-row flex-nowrap justify-between gap-2 font-serif text-base uppercase ${
              path === pathname
                ? "w-full border-b  border-current italic"
                : " w-fit"
            }`}
          >
            {project?.name}
          </motion.h2>
          {path === pathname ? null : (
            <div
              className={`${
                pathname.includes("/projects/") ? "h-10 w-10" : "h-48 w-48"
              } pointer-events-auto relative overflow-hidden dark:opacity-50 dark:group-hover:opacity-100`}
            >
              <Image
                src={project.thumbnail}
                alt={project.thumbnail}
                fill
                sizes="400px"
                style={{ position: "absolute", objectFit: "cover" }}
              />
            </div>
          )}
          {/* {path !== pathname && <Image src={project.thumbnail} className=" absolute object-cover -z-[5] opacity-90 blur-sm" alt={project.thumbnail} fill />} */}
        </Link>
        {path === pathname && children}
      </li>
      {path === pathname && (
        <>
          {
            <Link
              className=" contents"
              href={handleDirection(-1)}
              onClick={() => play()}
            >
              <GrPrevious className="pointer-events-auto absolute right-1 top-2 z-50 h-8 w-8 rotate-90 transform cursor-pointer fill-current hover:scale-90 active:scale-75 md:h-4 md:w-4 lg:left-1 lg:right-auto lg:rotate-0 [&_*]:!stroke-current" />
            </Link>
          }
          {
            <Link
              className=" contents"
              href={handleDirection(1)}
              onClick={() => play()}
            >
              <GrNext className="pointer-events-auto absolute bottom-2 right-1 z-50 h-8 w-8 rotate-90 transform cursor-pointer fill-current hover:scale-90 active:scale-75 md:h-4 md:w-4 lg:bottom-auto lg:top-2 lg:rotate-0 [&_*]:!stroke-current" />
            </Link>
          }
        </>
      )}
    </>
  );
}
