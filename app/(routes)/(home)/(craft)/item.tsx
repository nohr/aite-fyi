import Image from "next/image";
import Programs from "./[project]/programs";
import { GoChevronRight } from "react-icons/go";
import { Project } from "types/Project";
import { memo, useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { useInView } from "framer-motion";

const Item = memo(function Item({
  project,
  play,
}: {
  project: Project;
  play: () => void;
}) {
  const { name, thumbnail, program, rank, slug, content } = project;
  const router = useRouter();
  const searchParams = useSearchParams();
  const sizing =
    rank === 1
      ? "aspect-[9/4]"
      : rank === 2
        ? "aspect-[16/10]"
        : "aspect-[8/4]";

  const ref = useRef<HTMLVideoElement>(null!);
  const isInView = useInView(ref);

  useEffect(() => {
    if (ref.current === null) return;

    if (isInView.valueOf()) ref.current.play();
    else ref.current.pause();
  }, [isInView]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return "?" + params.toString();
    },
    [searchParams],
  );

  const medium = searchParams.get("medium");

  return (
    <div
      tabIndex={0}
      onClick={() => {
        if (rank === 0) return;
        router.push(
          `/${slug}${medium ? createQueryString("medium", medium) : ""}`,
        );
        play();
      }}
      className={` group/item pointer-events-auto relative z-10 flex w-full flex-col gap-0 overflow-hidden rounded-2xl border border-border shadow-lg ${sizing} ${
        rank > 0 ? "cursor-pointer active:scale-90" : "gap-2 bg-background p-2"
      }`}
    >
      <div
        className={`pointer-events-none relative h-full overflow-hidden rounded-xl shadow-lg `}
      >
        {thumbnail?.video ? (
          <video
            ref={ref}
            autoPlay={false}
            playsInline
            disablePictureInPicture
            muted
            loop
            preload="metadata"
            poster={thumbnail?.blurhash}
            src={`${thumbnail?.video}#t=0.01`}
            controls={false}
            className={`pointer-events-none absolute z-[1] h-full w-full scale-105 overflow-clip object-cover`}
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
          <div className="absolute right-4 z-10 text-sm lowercase md:group-hover/item:opacity-0">
            <PortableText value={content} />
          </div>
        )}

        {program && (
          <Programs
            program={program}
            className=" z-20 !items-end opacity-0 md:group-hover/item:opacity-100"
          />
        )}
      </div>
    </div>
  );
});

export default Item;
