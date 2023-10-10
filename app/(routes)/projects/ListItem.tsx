"use client";

import { Project } from "types/Project";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect } from "react";
import useSFX from "@hooks/useSFX";
import Image from "next/image";
import { MdNextPlan } from "react-icons/md";
import { GrFormNext, GrFormNextLink, GrFormPrevious, GrFormPreviousLink, GrNext, GrPrevious } from "react-icons/gr";

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
  const router = useRouter();
  const path = `/projects/${project?.slug}`;
  const [play] = useSFX("/sfx/click.mp3");

  function handleDirection(n: number) {
    const index = projects.findIndex((p) => p._id === project._id);
    const nextIndex = index + n === projects.length  ? 0 : index + n < 0 ? projects.length-1 : index + n;
    const nextSlug = projects[nextIndex]?.slug;
    
    if (nextSlug === undefined) return path;
    return nextSlug;
  }

  return (
    <>
    <li
      className={`flex flex-col gap-2  ${
        path === pathname ? " h-full w-full md:!w-[65ch] " : ""
      }`}
    >
      <Link href={path === pathname ? "/projects" : path} onClick={()=>play()} className={`${!pathname.includes(path) ? " overflow-hidden relative hover:border-current flex-row w-fit p-2 pointer-events-auto gap-4":"flex-col w-full " } flex gap-2 items-center h-fit no-underline rounded-3xl border-[1px] border-transparent transition-all duration-75`}>
        <motion.h2
          className={` pointer-events-auto flex select-none flex-row flex-nowrap justify-between gap-2 font-serif text-base uppercase ${
            path === pathname ? "italic w-full  border-b-[1px] border-current" : " w-fit"
          }`}
        >
          {project?.name}
        </motion.h2>
     {path === pathname ? null : 
     <div className={`${pathname.includes("/projects/") ? "w-10 h-10":"w-24 h-24"} rounded-xl overflow-hidden relative pointer-events-auto`}>
        <Image src={project.thumbnail} alt={project.thumbnail} fill style={{position:"absolute", objectFit:"cover"}} />
            </div>}
          {/* {path !== pathname && <Image src={project.thumbnail} className=" absolute object-cover -z-[5] opacity-90 blur-sm" alt={project.thumbnail} fill />} */}
      </Link>
      {path === pathname && children}
    </li>
      {path === pathname &&
        <> 
        {<Link className=" contents" href={handleDirection(-1)} onClick={() => play()}><GrPrevious className="w-8 h-8 md:w-4 md:h-4 lg:left-1 right-1 lg:right-auto lg:rotate-0 rotate-90 hover:scale-90 active:scale-75 fill-current absolute [&_*]:!stroke-current top-2 pointer-events-auto cursor-pointer transform z-50" /></Link>}
        {<Link className=" contents" href={handleDirection(1)} onClick={() => play()}><GrNext className="w-8 h-8 md:w-4 md:h-4 lg:top-2 lg:bottom-auto right-1 lg:rotate-0 rotate-90 hover:scale-90 active:scale-75 fill-current absolute [&_*]:!stroke-current bottom-2 pointer-events-auto cursor-pointer transform z-50" /></Link>}
      </>
      }
    </>
  );
}
