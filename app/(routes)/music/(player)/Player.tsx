"use client";

import { useAudioStore } from "@hooks/useAudioStore";
import Image from "next/image";
import Controls from "./Controls";
import { getSongs } from "sanity.utils";
import { useEffect } from "react";
import { Song } from "types/Song";

const Cover = ({
  song,
  className,
}: {
  song: Song | null;
  className?: string;
}) => (
  <div className={className}>
    {song?.cover ? (
      <Image
        src={song.cover}
        alt={song.name}
        fill
        priority
        sizes="100%"
        className={"pointer-events-auto absolute object-cover"}
      />
    ) : null}
  </div>
);

export default function Player() {
  const [song] = useAudioStore((s) => [s.song]);
  const { setState } = useAudioStore;
  useEffect(() => {
    (async () => {
      const songs = await getSongs();
      if (songs.length > 0) {
        if (!song) setState({ song: songs[0] });
        setState({ playlist: songs });
      }
    })();
  }, [setState, song]);

  return (
    <div className=" items-between pointer-events-none flex w-full flex-row justify-start gap-4 p-2 md:-order-1 md:divide-x md:divide-solid md:divide-current">
      <Cover
        song={song}
        className="relative hidden !aspect-square h-fit w-1/4 overflow-hidden border-[0px] border-current shadow-lg md:block"
      />
      <div className=" flex w-full flex-col justify-end gap-4 px-2 md:px-0 md:pl-3">
        {song ? (
          <div className=" flex gap-4">
            <Cover
              song={song}
              className="relative !aspect-square h-full w-auto overflow-hidden border-[0px] border-current shadow-lg md:hidden"
            />
            <div className=" flex w-fit flex-col justify-end gap-2">
              <div className=" pointer-events-auto font-heritage text-6xl font-extralight uppercase tracking-tighter">
                {song.name}
              </div>
              <div className="flex h-fit flex-row gap-2 self-start font-mono text-xs font-thin uppercase tracking-tighter">
                <div className=" pointer-events-auto ">{song.artist}</div> -
                <div className=" pointer-events-auto ">{song.album}</div>
              </div>
            </div>
          </div>
        ) : null}
        <Controls />
      </div>
    </div>
  );
}
