"use client";

import useSFX from "@hooks/useSFX";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Project } from "types/Project";

export default function Arrows({
  projects,
  children,
}: {
  projects: Project[];
  children: React.ReactNode;
}) {
  const [play] = useSFX("/sfx/click2.mp3");
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
  const arrowClass =
    "cursor-pointer opacity-25 hover:opacity-75 fill-current hover:scale-90 active:scale-75 md:h-4 md:w-auto [&_*]:!stroke-current";

  const Arrow = ({ direction }: { direction: number }) => (
    <>
      {projects.length > 1 ? (
        <Link
          // style={{ top: "50%", transform: "translateY(-50%)" }}
          className={
            " absolute top-2 z-50 hidden h-12 w-fit transform items-center hover:animate-pulse md:flex" +
            (direction === -1 ? " -left-6" : " -right-6")
          }
          href={handleDirection(direction)}
          onClick={() => play()}
        >
          {direction === -1 ? (
            <GrPrevious className={arrowClass} />
          ) : (
            <GrNext className={arrowClass} />
          )}
        </Link>
      ) : null}
    </>
  );

  return (
    <>
      {project ? (
        <>
          <Arrow direction={-1} />
          {children}
          <Arrow direction={1} />
        </>
      ) : (
        children
      )}
    </>
  );
}
