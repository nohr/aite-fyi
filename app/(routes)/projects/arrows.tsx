"use client";

import useSFX from "@hooks/useSFX";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Project } from "types/Project";

export default function Arrows({ projects }: { projects: Project[] }) {
  const [play] = useSFX("/sfx/click.mp3");
  const pathname = usePathname();
  const project = projects.find((p) => `/projects/${p.slug}` === pathname);

  const path = `/projects/${project?.slug}`;

  function handleDirection(n: number) {
    const index = projects.findIndex((p) => p.slug === project?.slug);
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
      {project ? (
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
      ) : null}
    </>
  );
}
