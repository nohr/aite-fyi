import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { delayed_pagination_animation } from "_components/animate/route";
import Programs from "./[project]/programs";
import { GoChevronRight } from "react-icons/go";
import { Project } from "types/Project";
import { memo } from "react";

const Item = memo(function Item({
  project,
  play,
  index,
}: {
  project: Project;
  play: () => void;
  index: number;
}) {
  const { name, thumbnail, videos, program } = project;
  const path = `/craft/${project.slug}`;
  const video = videos?.[0]?.url;
  const showVideo = video;
  // const showVideo = !path.includes("sci-fi-previs") && video;
  const sizing =
    project.rank === 1
      ? "h-64 md:h-72"
      : project.rank === 2
        ? "h-72 md:h-96"
        : "h-44 md:h-50";
  return (
    <motion.div
      // whileHover={{
      //   scale: 1.05,
      //   zIndex: 1,
      //   transition: { duration: 0.2, ease: `easeInOut` },
      // }}
      {...delayed_pagination_animation(index)}
      className={`group/item flex w-full flex-col gap-0 overflow-hidden rounded-2xl border border-border shadow-lg ${sizing}`}
    >
      <Link
        href={path}
        onClick={() => play()}
        className={`pointer-events-auto relative flex h-full w-full flex-col overflow-hidden rounded-2xl no-underline duration-100 hover:border-current hover:shadow-md focus:border-current focus:shadow-md group-active/item:scale-90`}
      >
        <div
          className={`pointer-events-auto absolute -bottom-0.5 z-20 flex h-4/6 w-full select-none flex-row flex-nowrap items-end justify-center gap-2 bg-gradient-to-t from-[#000000f2] to-transparent to-70% p-4 text-lg lowercase tracking-tight text-[#cecece] duration-200 md:justify-between`}
        >
          <span className="flex items-center gap-1">
            {name}
            <GoChevronRight className="h-4 w-4 opacity-0 group-hover/item:animate-shake-left group-hover/item:opacity-100" />
          </span>

          {program && (
            <Programs
              program={program}
              className="hidden !items-end opacity-0 group-hover/item:opacity-100 md:flex"
            />
          )}
        </div>

        {showVideo ? (
          <video
            autoPlay={true}
            playsInline
            disablePictureInPicture
            muted
            loop
            preload="metadata"
            src={`${video}#t=0.01`}
            controls={false}
            className={`pointer-events-none absolute z-10 h-full w-full overflow-clip rounded-2xl object-cover`}
          />
        ) : null}

        <Image
          src={thumbnail}
          alt={name}
          fill
          sizes="400px"
          priority
          className={`pointer-events-none select-none rounded-2xl ${
            showVideo ? "blur-2xl" : ""
          }}`}
          style={{ position: "absolute", objectFit: "cover" }}
        />
      </Link>
    </motion.div>
  );
});

export default Item;
