import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { delayed_pagination_animation } from "_components/animate/route";
import Programs from "./[project]/programs";
import { GoChevronRight } from "react-icons/go";
import { Project } from "types/Project";
import { memo } from "react";
import { useRouter } from "next/navigation";

const Item = memo(function Item({
  project,
  play,
  index,
}: {
  project: Project;
  play: () => void;
  index: number;
}) {
  const { name, thumbnail, videos, program, rank, slug } = project;
  const router = useRouter();
  const sizing =
    rank === 1 ? "h-64 md:h-72" : rank === 2 ? "h-72 md:h-96" : "h-56 md:h-60";

  return (
    <motion.div
      tabIndex={0}
      onClick={() => {
        if (rank <= 0) return;
        play();
        router.push(`/craft/${slug}`);
      }}
      {...delayed_pagination_animation(index)}
      className={` group/item pointer-events-auto flex w-full flex-col gap-0  rounded-2xl border border-border shadow-lg active:scale-90 ${sizing} ${
        rank > 0 ? "cursor-pointer" : ""
      }`}
    >
      <div className="relative h-full overflow-hidden rounded-2xl">
        {videos?.[0]?.url ? (
          <video
            autoPlay={true}
            playsInline
            disablePictureInPicture
            muted
            loop
            preload="metadata"
            src={`${videos[0].url}#t=0.01`}
            controls={false}
            className={`pointer-events-none absolute z-10 h-full w-full overflow-clip object-cover`}
          />
        ) : null}

        <Image
          src={thumbnail}
          alt={name}
          fill
          sizes="400px"
          priority
          className={`pointer-events-none absolute select-none object-cover ${
            videos?.[0]?.url ? "blur-2xl" : ""
          }}`}
        />
      </div>

      <div
        className={`  -bottom-0.5 z-20 flex  w-full select-none flex-row flex-nowrap items-end justify-center gap-2 p-4 text-lg lowercase tracking-tight text-[#cecece] duration-200 md:justify-between ${
          rank > 0
            ? "absolute h-4/6 bg-gradient-to-t from-[#000000f2] to-transparent to-70%"
            : ""
        }`}
      >
        <span className="flex items-center gap-1">
          {name}
          {rank > 0 && (
            <GoChevronRight className="h-4 w-4 group-hover/item:animate-shake-left" />
          )}
        </span>

        {program && (
          <Programs
            program={program}
            className="hidden !items-end opacity-0 group-hover/item:opacity-100 md:flex"
          />
        )}
      </div>
    </motion.div>
  );
});

export default Item;
