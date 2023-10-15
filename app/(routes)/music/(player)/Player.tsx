"use client";

import { useAudioStore } from "@hooks/useAudioStore";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa";
import Controls from "./Controls";
import { getSongs } from "sanity.utils";
import { useEffect } from "react";
import { Song } from "types/Song";

const Cover = ({ song }: { song: Song }) =>
  song && song.cover ? (
    <Image
      src={song.cover}
      alt={song.name}
      fill
      sizes="100%"
      className="pointer-events-auto absolute object-cover"
    />
  ) : (
    <FaSpinner className=" animate-spin" />
  );

export default function Player() {
  const [song, setSong, setPlaylist] = useAudioStore((s) => [
    s.song,
    s.setSong,
    s.setPlaylist,
  ]);

  useEffect(() => {
    (async () => {
      const songs = await getSongs();
      if (songs.length > 0) {
        if (!song) setSong(songs[0]);
        setPlaylist(songs);
      }
    })();
  }, [setPlaylist, setSong, song]);

  return (
    <div className="items-between pointer-events-none flex h-full w-full flex-row justify-start gap-4 p-2">
      {/* Cover */}
      {song ? (
        <div className="relative !aspect-square h-fit w-1/4 overflow-hidden rounded-xl border-[0px] border-current shadow-lg">
          <Cover song={song} />
        </div>
      ) : null}
      <div className=" flex w-full flex-col justify-between gap-2">
        {/* Song info */}
        <div className=" h-max ">
          {song ? (
            <>
              <div className=" pointer-events-auto font-serif text-base uppercase">
                {song.name}
              </div>
              <div className="flex flex-row gap-2">
                <div className=" pointer-events-auto">{song.artist}</div> •
                <div className=" pointer-events-auto">{song.album}</div>
              </div>
            </>
          ) : null}
        </div>
        <Controls />
      </div>
    </div>
  );
}
