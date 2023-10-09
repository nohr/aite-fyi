"use client";

import { Project } from "types/Project";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect } from "react";
import useSFX from "@hooks/useSFX";

export default function ListItem({
  children,
  project,
}: {
  children: React.ReactNode;
  project: Project;
}) {
  const pathname = usePathname();
  const path = `/projects/${project?.slug}`;
  const [play] = useSFX("/sfx/click.mp3");
  return (
    <li
      className={`mb-0 ml-3 mt-4 flex flex-col gap-2 md:m-4 md:mt-2 ${
        path === pathname ? "order-1 h-full" : "order-2"
      }`}
    >
      <Link href={path === pathname ? "/projects" : path} onClick={()=>play()} className=" contents">
        <motion.h2
          className={` pointer-events-auto flex select-none flex-row flex-nowrap justify-between gap-2 border-b-[1px] border-current font-serif text-base uppercase md:hover:w-[65ch] ${
            path === pathname ? "italic" : ""
          }
          ${path === pathname ? "md:w-full" : "w-min"}`}
        >
          {project?.name}
        </motion.h2>
      </Link>
      {path === pathname && children}
    </li>
  );
}
