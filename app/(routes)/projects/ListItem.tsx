"use client";

import { Project } from "types/Project";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function ListItem({
  children,
  project,
}: {
  children: React.ReactNode;
  project: Project;
}) {
  const pathname = usePathname();
  const path = `/projects/${project?.slug}`;

  return (
    <li className="m-4 mb-0 flex flex-col gap-2 ">
      <Link href={path} className=" contents">
        <motion.p
          whileHover={{ width: "65ch" }}
          style={{ width: path === pathname ? "100%" : "min-content" }}
          className={` text-md pointer-events-auto flex flex-row flex-nowrap justify-between gap-2 border-b-[1px] border-current font-serif  uppercase ${
            pathname.includes(project?.slug) ? "italic" : ""
          }`}
        >
          {project?.name}
        </motion.p>
      </Link>
      {path === pathname && children}
    </li>
  );
}
