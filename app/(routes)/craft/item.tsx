// import Link from "next/link";
import Image from "next/image";
import Programs from "./[project]/programs";
import { GoChevronRight } from "react-icons/go";
import { Project } from "types/Project";
import { memo } from "react";
import { useRouter } from "next/navigation";
import { PortableText } from "@portabletext/react";

const Item = memo(function Item({
  project,
  play,
}: {
  project: Project;
  play: () => void;
}) {
  const { name, thumbnail, program, rank, slug, content } = project;
  const router = useRouter();
  const sizing =
    rank > 0 ? "h-64 md:h-72" : rank > 1 ? "h-72 md:h-96" : "h-56 md:h-60";

  return (
    <div
      tabIndex={0}
      onClick={() => {
        if (rank === 0) return;
        router.push(`/craft/${slug}`);
        play();
      }}
      className={` group/item pointer-events-auto relative flex w-full flex-col gap-0 overflow-hidden rounded-2xl border border-border shadow-lg  ${sizing} ${
        rank > 0 ? "cursor-pointer active:scale-90" : "gap-2 p-2"
      }`}
    >
      <div
        className={`pointer-events-none relative h-full overflow-hidden rounded-xl shadow-lg `}
      >
        {thumbnail?.video ? (
          <video
            autoPlay={true}
            playsInline
            disablePictureInPicture
            muted
            loop
            preload="metadata"
            src={`${thumbnail?.video}#t=0.01`}
            controls={false}
            className={`pointer-events-none absolute z-10 h-full w-full overflow-clip object-cover`}
          />
        ) : null}

        {thumbnail?.blurhash ? (
          <Image
            src={thumbnail?.blurhash}
            alt={name}
            fill
            sizes="400px"
            priority
            className={`pointer-events-none absolute select-none object-cover`}
          />
        ) : null}
      </div>

      <div
        translate="no"
        className={` -bottom-0.5 z-20 flex w-full select-none flex-row flex-nowrap items-end justify-between gap-2 rounded-2xl text-lg tracking-tight duration-200 dark:!text-[#cecece] ${
          rank > 0
            ? "absolute h-4/6 bg-gradient-to-t from-[#000000f2] to-transparent to-70% p-4 text-[#cecece] "
            : " px-2 py-2 !text-[#131313] text-current"
        }`}
      >
        <span
          translate="no"
          className="flex items-center gap-1 text-sm lowercase italic"
        >
          {name}
          {rank > 0 && (
            <GoChevronRight className="h-4 w-4 md:group-hover/item:animate-shake-left" />
          )}
        </span>

        {rank < 1 && (
          <div className="absolute right-4 text-sm lowercase md:group-hover/item:opacity-0">
            <PortableText value={content} />
          </div>
        )}

        {program && (
          <Programs
            program={program}
            className=" !items-end opacity-0 md:group-hover/item:opacity-100"
          />
        )}
      </div>
    </div>
  );
});

export default Item;
