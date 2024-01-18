// import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { delayed_pagination_animation } from "_components/animate/route";
import Programs from "./[project]/programs";
import { GoChevronRight } from "react-icons/go";
import { Project } from "types/Project";
import { memo } from "react";
import { useRouter } from "next/navigation";
import { PortableText } from "@portabletext/react";

const Item = memo(function Item({
  project,
  play,
  index,
}: {
  project: Project;
  play: () => void;
  index: number;
}) {
  const { name, thumbnail, videos, program, rank, slug, content } = project;
  const router = useRouter();
  const sizing =
    rank > 0 ? "h-64 md:h-72" : rank > 1 ? "h-72 md:h-96" : "h-56 md:h-60";

  return (
    <motion.div
      tabIndex={0}
      onClick={() => {
        if (rank <= 0) return;
        play();
        router.push(`/craft/${slug}`);
      }}
      {...delayed_pagination_animation(index)}
      className={` group/item pointer-events-auto relative flex w-full flex-col gap-0 overflow-hidden rounded-2xl border border-border shadow-lg active:scale-90 ${sizing} ${
        rank > 0 ? "cursor-pointer " : "gap-2 p-2"
      }`}
    >
      <div className={`relative h-full overflow-hidden rounded-xl shadow-lg `}>
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
        className={` -bottom-0.5 z-20 flex w-full select-none flex-row flex-nowrap items-end justify-between gap-2 rounded-2xl text-lg lowercase tracking-tight 
        duration-200 ${
          rank > 0
            ? "absolute h-4/6 bg-gradient-to-t from-[#000000f2] to-transparent to-70% p-4 text-[#cecece]"
            : " py-2 text-current"
        }`}
      >
        <span className="flex items-center gap-1  italic">
          {name}
          {rank > 0 && (
            <GoChevronRight className="h-4 w-4 group-hover/item:animate-shake-left" />
          )}
        </span>

        {rank < 1 && (
          <p className=" absolute right-4 hidden text-sm opacity-50 group-hover/item:opacity-0 md:block">
            <PortableText value={content} />
          </p>
        )}

        {program && (
          <Programs
            program={program}
            className=" hidden !items-end opacity-0 group-hover/item:opacity-100 md:flex"
          />
        )}
      </div>
    </motion.div>
  );
});

export default Item;
