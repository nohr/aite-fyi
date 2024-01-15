import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { delayed_pagination_animation } from "_components/animate/route";
import Programs from "./[project]/programs";
import { GoChevronRight } from "react-icons/go";

export default function Item({
  name,
  index,
  play,
  path,
  thumbnail,
  video,
  program,
}: {
  name: string;
  index: number;
  play: () => void;
  path: string;
  thumbnail: string;
  video?: string;
  program?: string[];
}) {
  const showVideo = video;
  // const showVideo = !path.includes("sci-fi-previs") && video;
  return (
    <motion.div
      whileHover={{ scale: 1.05, zIndex: 1 }}
      {...delayed_pagination_animation(index)}
      className={`group/item flex h-64 w-full flex-col gap-0 overflow-hidden rounded-3xl border border-border shadow-lg sm:w-1/2 md:h-72  lg:w-1/3`}
    >
      <Link
        href={path}
        onClick={() => play()}
        className={`pointer-events-auto relative flex h-full w-full flex-col overflow-hidden rounded-3xl no-underline duration-100 hover:border-current hover:shadow-md focus:border-current focus:shadow-md group-active/item:scale-90`}
      >
        <div
          className={`pointer-events-auto absolute -bottom-0.5 z-20 flex h-4/6 w-full select-none flex-row flex-nowrap items-end justify-center gap-2 bg-gradient-to-t from-[#000000a1] to-transparent to-65% p-4 text-lg lowercase tracking-tight text-[#cecece] duration-200 md:justify-between`}
        >
          <span className="flex items-center gap-1 shadow-foreground group-hover/item:drop-shadow-md">
            {name}
            <GoChevronRight className="group-hover/item:animate-shake-left h-4 w-4 opacity-0 group-hover/item:opacity-100" />
          </span>

          {program && (
            <Programs program={program} className="hidden !items-end md:flex" />
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
            className={`pointer-events-none absolute z-10 h-full w-full overflow-clip rounded-3xl object-cover`}
          />
        ) : null}

        <Image
          src={thumbnail}
          alt={name}
          fill
          sizes="400px"
          priority
          className={`pointer-events-none select-none rounded-3xl ${
            showVideo ? "blur-2xl" : ""
          }}`}
          style={{ position: "absolute", objectFit: "cover" }}
        />
      </Link>
    </motion.div>
  );
}
